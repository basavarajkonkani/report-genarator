import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Function to fetch commits for a repository
async function fetchCommits(token: string, repo: string, since: string) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${repo}/commits`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        params: {
          since: since, // ISO format date string
          per_page: 100,
        },
      }
    );
    
    return response.data.map((commit: any) => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author.name,
      date: commit.commit.author.date,
      url: commit.html_url,
    }));
  } catch (error: any) {
    console.error(`Error fetching commits for ${repo}:`, error.message);
    return [];
  }
}

// Function to filter commits by username
function filterCommitsByUsername(commits: any[], usernames: string[]) {
  const lowercaseUsernames = usernames.map(name => name.toLowerCase().trim());
  
  return commits.filter(commit => {
    const authorName = commit.author.toLowerCase();
    return lowercaseUsernames.some(username => authorName.includes(username));
  });
}

export async function POST(request: NextRequest) {
  try {
    const { githubToken, repositories, githubUsernames, since } = await request.json();
    
    if (!githubToken || !repositories || !githubUsernames) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }
    
    const repoList = repositories.split('\n').map((repo: string) => repo.trim()).filter(Boolean);
    const usernameList = githubUsernames.split(',').map((name: string) => name.trim()).filter(Boolean);
    
    // Default to 24 hours ago if no date is provided
    const sinceDate = since || new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    
    // Fetch commits for each repository
    const reportsPromises = repoList.map(async (repo: string) => {
      const commits = await fetchCommits(githubToken, repo, sinceDate);
      const filteredCommits = filterCommitsByUsername(commits, usernameList);
      
      return {
        name: repo,
        commits: filteredCommits,
      };
    });
    
    const repoReports = await Promise.all(reportsPromises);
    
    // Group commits by username
    const userReports = usernameList.map(username => {
      const userRepositories = repoReports.map(repo => {
        const userCommits = repo.commits.filter(
          (commit: any) => commit.author.toLowerCase().includes(username.toLowerCase())
        );
        
        return {
          name: repo.name,
          commits: userCommits.map((commit: any) => commit.message),
        };
      }).filter(repo => repo.commits.length > 0);
      
      return {
        username,
        repositories: userRepositories,
      };
    }).filter(report => report.repositories.length > 0);
    
    return NextResponse.json({
      date: new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      reports: userReports,
    });
  } catch (error: any) {
    console.error('Error processing GitHub data:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process GitHub data' },
      { status: 500 }
    );
  }
}