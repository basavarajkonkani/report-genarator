'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  ChartBarIcon, 
  ClockIcon, 
  CogIcon,
  BellIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { fetchScheduledReports, fetchReportHistory, deleteScheduledReport } from './api';

// Define types for our data
type Report = {
  id: number | string;
  date: string;
  status: string;
  recipients: number;
  repositories: number;
  commits: number;
  error?: string;
};

type ScheduledReport = {
  id: string;
  name: string;
  schedule: string;
  nextRun: string;
  recipients: number;
  active: boolean;
  status: string;
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('reports');
  const [reports, setReports] = useState<Report[]>([]);
  const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Fetch data when component mounts
    Promise.all([
      fetchReportHistory(),
      fetchScheduledReports()
    ]).then(([reportsData, scheduledData]) => {
      setReports(reportsData);
      
      // Format scheduled reports for display
      const formattedScheduled = scheduledData.map(job => ({
        id: job.id,
        name: `Report for ${job.config.repositories.split(',')[0]}${job.config.repositories.includes(',') ? '...' : ''}`,
        schedule: `Every day at ${job.scheduleTime}`,
        nextRun: new Date().toLocaleDateString() + ', ' + job.scheduleTime,
        recipients: job.config.whatsappNumbers.split(',').length,
        active: job.status === 'scheduled',
        status: job.status
      }));
      
      setScheduledReports(formattedScheduled);
      setLoading(false);
    }).catch(err => {
      console.error('Failed to load data:', err);
      setError('Failed to load data. Please try again.');
      setLoading(false);
    });
  }, []);
  
  // Handle deleting a scheduled report
  const handleDeleteScheduled = (id: string) => {
    if (confirm('Are you sure you want to delete this scheduled report?')) {
      setLoading(true);
      deleteScheduledReport(id)
        .then(() => {
          // Remove the deleted report from state
          setScheduledReports(prev => prev.filter(report => report.id !== id));
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to delete scheduled report:', err);
          setError('Failed to delete scheduled report. Please try again.');
          setLoading(false);
        });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => {
                setLoading(true);
                Promise.all([
                  fetchReportHistory(),
                  fetchScheduledReports()
                ]).then(([reportsData, scheduledData]) => {
                  setReports(reportsData);
                  
                  // Format scheduled reports for display
                  const formattedScheduled = scheduledData.map(job => ({
                    id: job.id,
                    name: `Report for ${job.config.repositories.split(',')[0]}${job.config.repositories.includes(',') ? '...' : ''}`,
                    schedule: `Every day at ${job.scheduleTime}`,
                    nextRun: new Date().toLocaleDateString() + ', ' + job.scheduleTime,
                    recipients: job.config.whatsappNumbers.split(',').length,
                    active: job.status === 'scheduled',
                    status: job.status
                  }));
                  
                  setScheduledReports(formattedScheduled);
                  setLoading(false);
                }).catch(err => {
                  console.error('Failed to refresh data:', err);
                  setError('Failed to refresh data. Please try again.');
                  setLoading(false);
                });
              }}
              className="btn-secondary flex items-center space-x-1"
            >
              <ArrowPathIcon className="h-5 w-5" />
              <span>Refresh</span>
            </button>
            <a href="/settings" className="btn-primary flex items-center space-x-1">
              <CogIcon className="h-5 w-5" />
              <span>Settings</span>
            </a>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Reports</p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">24</h3>
              </div>
              <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ 12% from last month</p>
          </div>
          
          <div className="card p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Schedules</p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">2</h3>
              </div>
              <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-lg">
                <ClockIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Next run in 4 hours</p>
          </div>
          
          <div className="card p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Commits Today</p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">8</h3>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ 3 from yesterday</p>
          </div>
          
          <div className="card p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Delivery Rate</p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">96%</h3>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-lg">
                <BellIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <p className="text-xs text-red-600 dark:text-red-400 mt-2">↓ 2% from last week</p>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reports' 
                ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
            >
              Recent Reports
            </button>
            <button
              onClick={() => setActiveTab('scheduled')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'scheduled' 
                ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
            >
              Scheduled Reports
            </button>
          </nav>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {/* Loading State */}
        {loading ? (
          <div className="card p-12 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-400">Loading...</span>
          </div>
        ) : (
          <div>
            {/* Tab Content */}
            {activeTab === 'reports' && (
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Recipients
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Repositories
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Commits
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                      {reports.map((report) => (
                        <tr key={report.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {report.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {report.status === 'sent' ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                <CheckCircleIcon className="h-4 w-4 mr-1" />
                                Sent
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                <XCircleIcon className="h-4 w-4 mr-1" />
                                Failed
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {report.recipients}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {report.repositories}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {report.commits}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-3">
                              View
                            </button>
                            <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300">
                              Resend
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'scheduled' && (
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Schedule
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Next Run
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Recipients
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                      {scheduledReports.map((schedule, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {schedule.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {schedule.schedule}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {schedule.nextRun}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {schedule.recipients} recipient{schedule.recipients !== 1 ? 's' : ''}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {schedule.active ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                                Active
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                Paused
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-3">
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteScheduled(schedule.id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  );
}