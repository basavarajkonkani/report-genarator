'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  CogIcon, 
  KeyIcon, 
  BellIcon,
  UserIcon,
  ClockIcon,
  ShieldCheckIcon,
  CloudIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  
  const tabs = [
    { id: 'general', name: 'General', icon: CogIcon },
    { id: 'github', name: 'GitHub', icon: CloudIcon },
    { id: 'whatsapp', name: 'WhatsApp', icon: DevicePhoneMobileIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h1>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 card p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${activeTab === tab.id 
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'}`}
                >
                  <tab.icon className="mr-3 flex-shrink-0 h-5 w-5" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Content */}
          <div className="flex-1 card p-6">
            {activeTab === 'general' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">General Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="appName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Application Name
                    </label>
                    <input
                      type="text"
                      id="appName"
                      className="input-field"
                      defaultValue="GitHub Daily Report"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Timezone
                    </label>
                    <select id="timezone" className="input-field">
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Asia/Kolkata" selected>India Standard Time (IST)</option>
                      <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date Format
                    </label>
                    <select id="dateFormat" className="input-field">
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      <option value="DD MMM YYYY" selected>DD MMM YYYY</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'github' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">GitHub Integration</h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="githubToken" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      GitHub Personal Access Token
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <KeyIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="githubToken"
                        className="input-field pl-10"
                        placeholder="ghp_xxxxxxxxxxxx"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Create a token with repo scope at GitHub Developer Settings
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="repositories" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Repositories to Monitor
                    </label>
                    <textarea
                      id="repositories"
                      rows={3}
                      className="input-field"
                      placeholder="username/repo-name
organization/another-repo"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="githubUsers" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      GitHub Users to Track
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="githubUsers"
                        className="input-field pl-10"
                        placeholder="user1, user2, user3"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Use AI for Commit Summaries</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'whatsapp' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">WhatsApp Integration</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Integration Method
                    </label>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          id="pywhatkit"
                          name="integration-method"
                          type="radio"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          defaultChecked
                        />
                        <label htmlFor="pywhatkit" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          PyWhatKit (Free, requires WhatsApp Web)
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="twilio"
                          name="integration-method"
                          type="radio"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <label htmlFor="twilio" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Twilio API (Paid)
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="twilioSid" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Twilio Account SID (if using Twilio)
                    </label>
                    <input
                      type="text"
                      id="twilioSid"
                      className="input-field"
                      placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="twilioToken" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Twilio Auth Token (if using Twilio)
                    </label>
                    <input
                      type="password"
                      id="twilioToken"
                      className="input-field"
                      placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="whatsappNumbers" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      WhatsApp Numbers (Recipients)
                    </label>
                    <textarea
                      id="whatsappNumbers"
                      rows={3}
                      className="input-field"
                      placeholder="+1234567890
+9876543210"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Notification Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="scheduleTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Default Schedule Time
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ClockIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="time"
                        id="scheduleTime"
                        className="input-field pl-10"
                        defaultValue="18:00"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="messageFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message Format
                    </label>
                    <select id="messageFormat" className="input-field">
                      <option value="default" selected>Default Format</option>
                      <option value="compact">Compact Format</option>
                      <option value="detailed">Detailed Format</option>
                      <option value="custom">Custom Format</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="customFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Custom Format Template (if using custom format)
                    </label>
                    <textarea
                      id="customFormat"
                      rows={5}
                      className="input-field font-mono text-sm"
                      placeholder="Daily Work Report - {{date}}\n\n{{#each users}}\n{{name}}\n\n{{#each repositories}}\nRepo: {{name}}\n{{#each commits}}\n- {{message}}\n{{/each}}\n{{/each}}\n\n{{/each}}"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Send Error Notifications</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Send Empty Reports</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Security Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="encryptionKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Encryption Key
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="encryptionKey"
                        className="input-field pl-10"
                        placeholder="••••••••••••••••"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Used to encrypt sensitive information like tokens and credentials
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Store Credentials Securely</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Log Access Attempts</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <button className="btn-secondary">
                      Reset All Credentials
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-8 pt-5 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-end">
                <button type="button" className="btn-secondary mr-3">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}