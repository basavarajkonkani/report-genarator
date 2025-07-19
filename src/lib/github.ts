import axios from 'axios';

/**
 * GitHub API client for fetching repository data
 */
export class GitHubClient {
  private token: string;
  
  constructor(token: string) {
    this.token = token;
  }
  
  /**
   * Fetch commits for a repository since a specific date
   */
  async getCommits(repo: string, since: string) {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${repo}/commits`,
        {
          headers: {
            Authorization: `token ${this.token}`,
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
      throw new Error(`Failed to fetch commits for ${repo}: ${error.message}`);
    }
  }
  
  /**
   * Fetch repository information
   */
  async getRepository(repo: string) {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${repo}`,
        {
          headers: {
            Authorization: `token ${this.token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );
      
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching repository ${repo}:`, error.message);
      throw new Error(`Failed to fetch repository ${repo}: ${error.message}`);
    }
  }
  
  /**
   * Fetch user information
   */
  async getUser(username: string) {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`,
        {
          headers: {
            Authorization: `token ${this.token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );
      
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching user ${username}:`, error.message);
      throw new Error(`Failed to fetch user ${username}: ${error.message}`);
    }
  }
  
  /**
   * Validate GitHub token
   */
  async validateToken() {
    try {
      const response = await axios.get(
        'https://api.github.com/user',
        {
          headers: {
            Authorization: `token ${this.token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );
      
      return {
        valid: true,
        user: response.data.login,
      };
    } catch (error: any) {
      console.error('Error validating GitHub token:', error.message);
      return {
        valid: false,
        error: error.message,
      };
    }
  }
}

/**
 * Filter commits by username
 */
export function filterCommitsByUsername(commits: any[], usernames: string[]) {
  const lowercaseUsernames = usernames.map(name => name.toLowerCase().trim());
  
  return commits.filter(commit => {
    const authorName = commit.author.toLowerCase();
    return lowercaseUsernames.some(username => authorName.includes(username));
  });
}

/**
 * Generate a formatted report from GitHub data
 */
export function generateReport(data: any) {
  const { date, reports } = data;
  
  let message = `Daily Work Report - ${date}\n\n`;

  reports.forEach((report: any) => {
    message += `${report.username}\n`;
    
    report.repositories.forEach((repo: any) => {
      message += `\nRepo: ${repo.name}\n`;
      repo.commits.forEach((commit: string) => {
        message += `- ${commit}\n`;
      });
    });
    
    message += '\n';
  });

  return message;
}