'use client';

import { useState } from 'react';
import { DocumentCheckIcon, ClipboardDocumentIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { sendWhatsAppMessage } from '@/lib/api';

interface Repository {
  name: string;
  commits: string[];
}

interface Report {
  username: string;
  repositories: Repository[];
}

interface PreviewData {
  date: string;
  reports: Report[];
}

interface ReportPreviewProps {
  data: PreviewData | null;
  config?: any;
}

export default function ReportPreview({ data, config }: ReportPreviewProps) {
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-80 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center bg-gray-50 dark:bg-gray-800/50 transition-all duration-300 hover:border-primary-300 dark:hover:border-primary-700">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-6">
          <DocumentCheckIcon className="h-16 w-16 text-primary-500 dark:text-primary-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">No Preview Available</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
          Configure your settings and click "Generate Preview" to see how your report will look.
        </p>
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6 w-full max-w-xs">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            The preview will show your GitHub activity formatted for WhatsApp delivery.
          </p>
        </div>
      </div>
    );
  }

  const copyToClipboard = () => {
    const reportText = generateReportText();
    navigator.clipboard.writeText(reportText);
    alert('Report copied to clipboard!');
  };
  
  const handleSendWhatsApp = async () => {
    if (!data || !config) {
      alert('Please generate a report and provide WhatsApp numbers first.');
      return;
    }
    
    try {
      setIsSending(true);
      setSendSuccess(false);
      
      const result = await sendWhatsAppMessage(data, config);
      
      setSendSuccess(true);
      alert(`Report sent successfully to ${config.whatsappNumbers}!`);
    } catch (error: any) {
      console.error('Error sending WhatsApp message:', error);
      alert(`Error: ${error.message || 'Failed to send WhatsApp message'}`);
    } finally {
      setIsSending(false);
    }
  };

  const generateReportText = () => {
    if (!data) return '';
    
    let text = `Daily Work Report - ${data.date}\n\n`;

    data.reports.forEach((report: Report) => {
      text += `${report.username}\n`;
      
      report.repositories.forEach((repo: Repository) => {
        text += `\nRepo: ${repo.name}\n`;
        repo.commits.forEach((commit: string) => {
          text += `- ${commit}\n`;
        });
      });
      
      text += '\n';
    });

    return text;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Daily Work Report - {data.date}</span>
        </h3>
        <div className="flex space-x-2">
          <button 
            onClick={handleSendWhatsApp}
            disabled={isSending || !config?.whatsappNumbers}
            className="text-green-600 hover:text-green-700 flex items-center space-x-1 text-sm bg-green-50 dark:bg-green-900/30 px-3 py-1.5 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="h-4 w-4" />
            <span>{isSending ? 'Sending...' : 'Send to WhatsApp'}</span>
          </button>
          <button 
            onClick={copyToClipboard}
            className="text-primary-600 hover:text-primary-700 flex items-center space-x-1 text-sm bg-primary-50 dark:bg-primary-900/30 px-3 py-1.5 rounded-full transition-colors duration-200"
          >
            <ClipboardDocumentIcon className="h-4 w-4" />
            <span>Copy to Clipboard</span>
          </button>
        </div>
      </div>
      
      {sendSuccess && (
        <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md border border-green-200">
          <p className="text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Report sent successfully to WhatsApp!
          </p>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 font-mono text-sm whitespace-pre-wrap shadow-sm border border-gray-100 dark:border-gray-700">
        {data && data.reports.map((report: Report, reportIndex: number) => (
          <div key={reportIndex} className="mb-6 last:mb-0">
            <div className="font-bold text-base text-primary-700 dark:text-primary-400 border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">
              {report.username}
            </div>
            
            {report.repositories.map((repo: Repository, repoIndex: number) => (
              <div key={repoIndex} className="mt-4 first:mt-0 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
                <div className="font-semibold flex items-center text-gray-800 dark:text-gray-200 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  {repo.name}
                </div>
                <ul className="space-y-1.5 pl-2">
                  {repo.commits.map((commit: string, commitIndex: number) => (
                    <li key={commitIndex} className="flex items-start">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-500 dark:bg-primary-400 mt-1.5 mr-2 flex-shrink-0"></span>
                      <span className="text-gray-700 dark:text-gray-300">{commit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Preview ready to be sent via WhatsApp</span>
        </div>
        <button className="btn-primary w-full sm:w-auto flex items-center justify-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <span>Send Now</span>
        </button>
      </div>
    </div>
  );
}