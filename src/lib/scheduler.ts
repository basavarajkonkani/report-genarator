/**
 * Scheduler utilities for managing report scheduling
 */

// Interface for scheduled job
export interface ScheduledJob {
  id: string;
  config: any;
  scheduleTime: string;
  hours: number;
  minutes: number;
  createdAt: string;
  status: 'scheduled' | 'running' | 'completed' | 'failed';
  lastRun?: string;
  error?: string;
}

// In-memory storage for scheduled jobs (in a production app, use a database)
let scheduledJobs: ScheduledJob[] = [];

/**
 * Scheduler class for managing report scheduling
 */
export class Scheduler {
  /**
   * Add a new scheduled job
   */
  static addJob(config: any, scheduleTime: string): ScheduledJob {
    // Parse the schedule time (HH:MM format)
    const [hours, minutes] = scheduleTime.split(':').map(Number);
    
    // Generate a unique ID for the job
    const jobId = Date.now().toString();
    
    // Create a new scheduled job
    const newJob: ScheduledJob = {
      id: jobId,
      config,
      scheduleTime,
      hours,
      minutes,
      createdAt: new Date().toISOString(),
      status: 'scheduled',
    };
    
    // Add the job to the in-memory storage
    scheduledJobs.push(newJob);
    
    return newJob;
  }
  
  /**
   * Get all scheduled jobs
   */
  static getJobs(): ScheduledJob[] {
    return scheduledJobs;
  }
  
  /**
   * Get a specific job by ID
   */
  static getJob(jobId: string): ScheduledJob | undefined {
    return scheduledJobs.find(job => job.id === jobId);
  }
  
  /**
   * Delete a scheduled job
   */
  static deleteJob(jobId: string): boolean {
    const jobIndex = scheduledJobs.findIndex(job => job.id === jobId);
    
    if (jobIndex === -1) {
      return false;
    }
    
    scheduledJobs.splice(jobIndex, 1);
    return true;
  }
  
  /**
   * Update a job's status
   */
  static updateJobStatus(jobId: string, status: ScheduledJob['status'], error?: string): boolean {
    const job = scheduledJobs.find(job => job.id === jobId);
    
    if (!job) {
      return false;
    }
    
    job.status = status;
    job.lastRun = new Date().toISOString();
    
    if (error) {
      job.error = error;
    }
    
    return true;
  }
  
  /**
   * Check if it's time to run a job
   */
  static shouldRunJob(job: ScheduledJob): boolean {
    const now = new Date();
    return now.getHours() === job.hours && now.getMinutes() === job.minutes;
  }
}

/**
 * In a real application, you would implement a proper scheduler that runs in the background
 * This could be done using a cron job, a worker service, or a scheduled task
 * 
 * For example, you might use a library like node-cron:
 * 
 * import cron from 'node-cron';
 * 
 * // Schedule a task to run every minute to check for jobs that need to be executed
 * cron.schedule('* * * * *', async () => {
 *   const jobs = Scheduler.getJobs();
 *   
 *   for (const job of jobs) {
 *     if (Scheduler.shouldRunJob(job)) {
 *       try {
 *         // Update job status to running
 *         Scheduler.updateJobStatus(job.id, 'running');
 *         
 *         // Execute the job (fetch GitHub data and send WhatsApp message)
 *         // ...
 *         
 *         // Update job status to completed
 *         Scheduler.updateJobStatus(job.id, 'completed');
 *       } catch (error) {
 *         // Update job status to failed
 *         Scheduler.updateJobStatus(job.id, 'failed', error.message);
 *       }
 *     }
 *   }
 * });
 */