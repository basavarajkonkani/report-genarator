/**
 * Dashboard API utilities
 */
import { ScheduledJob, ReportData } from '@/lib/types';

/**
 * Fetch all scheduled reports
 */
export async function fetchScheduledReports(): Promise<ScheduledJob[]> {
  try {
    const response = await fetch('/api/scheduler', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch scheduled reports:', error);
    return [];
  }
}

/**
 * Delete a scheduled report
 */
export async function deleteScheduledReport(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/scheduler?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Failed to delete scheduled report:', error);
    return false;
  }
}

/**
 * Fetch recent reports history
 * Note: In a real implementation, this would fetch from a database
 * For now, we'll return mock data
 */
export async function fetchReportHistory(): Promise<any[]> {
  // Mock data for reports
  return [
    {
      id: 1,
      date: '16 July 2025',
      status: 'sent',
      recipients: 3,
      repositories: 2,
      commits: 8,
    },
    {
      id: 2,
      date: '15 July 2025',
      status: 'sent',
      recipients: 3,
      repositories: 2,
      commits: 5,
    },
    {
      id: 3,
      date: '14 July 2025',
      status: 'failed',
      recipients: 3,
      repositories: 2,
      commits: 12,
      error: 'WhatsApp connection failed',
    },
  ];
}