/**
 * Type definitions for the application
 */

/**
 * GitHub repository commit
 */
export interface Commit {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

/**
 * Repository with commits
 */
export interface Repository {
  name: string;
  commits: string[];
}

/**
 * User report with repositories
 */
export interface UserReport {
  username: string;
  repositories: Repository[];
}

/**
 * Report data structure
 */
export interface ReportData {
  date: string;
  reports: UserReport[];
}

/**
 * Application configuration
 */
export interface AppConfig {
  githubToken: string;
  repositories: string;
  githubUsernames: string;
  whatsappNumbers: string;
  scheduleTime: string;
  messageFormat: 'default' | 'detailed' | 'minimal';
  useAI: boolean;
  messagingOption: 'pywhatkit' | 'twilio';
  twilioConfig?: {
    accountSid: string;
    authToken: string;
    fromNumber: string;
  };
}

/**
 * Scheduled job
 */
export interface ScheduledJob {
  id: string;
  config: AppConfig;
  scheduleTime: string;
  hours: number;
  minutes: number;
  createdAt: string;
  status: 'scheduled' | 'running' | 'completed' | 'failed';
  lastRun?: string;
  error?: string;
}