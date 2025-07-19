'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ConfigForm from '@/components/ConfigForm';
import ReportPreview from '@/components/ReportPreview';
import Footer from '@/components/Footer';

export default function Home() {
  const [config, setConfig] = useState({
    githubToken: '',
    repositories: '',
    githubUsernames: '',
    whatsappNumbers: '',
    scheduleTime: '18:00',
    messageFormat: 'default',
    useAI: false,
    messagingOption: 'pywhatkit',
  });

  interface PreviewData {
    date: string;
    reports: {
      username: string;
      repositories: {
        name: string;
        commits: string[];
      }[];
    }[];
  }

  const [previewData, setPreviewData] = useState<PreviewData | null>(null);

  const handleConfigChange = (newConfig: any) => {
    setConfig(newConfig);
  };

  const handleGeneratePreview = async () => {
    try {
      // Show loading state
      setPreviewData(null);
      
      // Calculate the date for 24 hours ago
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const sinceDate = yesterday.toISOString();
      
      // Call the GitHub API route
      const response = await fetch('/api/github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          githubToken: config.githubToken,
          repositories: config.repositories,
          githubUsernames: config.githubUsernames,
          since: sinceDate,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch GitHub data');
      }
      
      const data = await response.json();
      setPreviewData(data);
    } catch (error: any) {
      console.error('Error generating preview:', error);
      alert(`Error: ${error.message || 'Failed to generate preview'}`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-900 dark:text-white">GitHub Report Generator</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">Configure your GitHub repositories and WhatsApp settings to automatically send daily commit reports to your team.</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="card p-8 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Configuration
              </h2>
              <ConfigForm config={config} onChange={handleConfigChange} onGeneratePreview={handleGeneratePreview} />
            </div>
            
            <div className="card p-8 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Report Preview
              </h2>
              <ReportPreview data={previewData} config={config} />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}