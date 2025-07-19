'use client';

import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { ClockIcon, KeyIcon, UserIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { scheduleReport } from '@/lib/api';

interface ConfigFormProps {
  config: any;
  onChange: (config: any) => void;
  onGeneratePreview: () => void;
}

export default function ConfigForm({ config, onChange, onGeneratePreview }: ConfigFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...config, [name]: value });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    onChange({ ...config, [name]: checked });
  };

  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleSuccess, setScheduleSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGeneratePreview();
  };

  const handleSchedule = async () => {
    try {
      setIsScheduling(true);
      setScheduleSuccess(false);
      
      const result = await scheduleReport(config);
      
      setScheduleSuccess(true);
      alert(`Report scheduled successfully! It will run daily at ${config.scheduleTime}.`);
    } catch (error: any) {
      console.error('Error scheduling report:', error);
      alert(`Error: ${error.message || 'Failed to schedule report'}`);
    } finally {
      setIsScheduling(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <div>
          <label htmlFor="githubToken" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            GitHub Token
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <KeyIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="githubToken"
              name="githubToken"
              value={config.githubToken}
              onChange={handleInputChange}
              className="input-field pl-10"
              placeholder="ghp_xxxxxxxxxxxx"
              required
            />
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Create a token with repo scope at GitHub Developer Settings
          </p>
        </div>

        <div>
          <label htmlFor="repositories" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Repositories (one per line)
          </label>
          <textarea
            id="repositories"
            name="repositories"
            value={config.repositories}
            onChange={handleInputChange}
            rows={3}
            className="input-field"
            placeholder="username/repo-name
organization/another-repo"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="githubUsernames" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              GitHub Usernames (comma separated)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="githubUsernames"
                name="githubUsernames"
                value={config.githubUsernames}
                onChange={handleInputChange}
                className="input-field pl-10"
                placeholder="user1, user2, user3"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="whatsappNumbers" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              WhatsApp Numbers (comma separated)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="whatsappNumbers"
                name="whatsappNumbers"
                value={config.whatsappNumbers}
                onChange={handleInputChange}
                className="input-field pl-10"
                placeholder="+1234567890, +9876543210"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="scheduleTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Schedule Time
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ClockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="time"
                id="scheduleTime"
                name="scheduleTime"
                value={config.scheduleTime}
                onChange={handleInputChange}
                className="input-field pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="messagingOption" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Messaging Option
            </label>
            <select
              id="messagingOption"
              name="messagingOption"
              value={config.messagingOption}
              onChange={handleInputChange}
              className="input-field"
              required
            >
              <option value="pywhatkit">PyWhatKit (Free, requires WhatsApp Web)</option>
              <option value="twilio">Twilio API (Paid)</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="messageFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message Format
          </label>
          <select
            id="messageFormat"
            name="messageFormat"
            value={config.messageFormat}
            onChange={handleInputChange}
            className="input-field"
            required
          >
            <option value="default">Default Format</option>
            <option value="compact">Compact Format</option>
            <option value="detailed">Detailed Format</option>
            <option value="custom">Custom Format</option>
          </select>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${config.useAI ? 'bg-primary-100 dark:bg-primary-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${config.useAI ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Use AI for Summary</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">AI will generate concise summaries of commit messages</p>
              </div>
            </div>
            <Switch
              checked={config.useAI}
              onChange={(checked) => handleSwitchChange('useAI', checked)}
              className={`${config.useAI ? 'bg-primary-600' : 'bg-gray-300'}
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
            >
              <span
                className={`${config.useAI ? 'translate-x-6' : 'translate-x-1'}
                  inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform`}
              />
            </Switch>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={handleSchedule}
          disabled={isScheduling}
          className="btn-secondary flex items-center justify-center space-x-2"
        >
          {isScheduling ? 'Scheduling...' : 'Schedule Daily Report'}
        </button>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="btn-secondary flex items-center justify-center space-x-2"
            onClick={() => {
              onChange({
                githubToken: '',
                repositories: '',
                githubUsernames: '',
                whatsappNumbers: '',
                scheduleTime: '18:00',
                messageFormat: 'default',
                useAI: false,
                messagingOption: 'pywhatkit',
              });
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Reset Form</span>
          </button>
          <button type="submit" className="btn-primary flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>Generate Preview</span>
          </button>
        </div>
      </div>
      
      {scheduleSuccess && (
        <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md border border-green-200">
          <p className="text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Report scheduled successfully! It will run daily at {config.scheduleTime}.
          </p>
        </div>
      )}
    </form>
  );
}