/**
 * API utilities for interacting with backend services
 */

/**
 * Generate a preview report from GitHub data
 */
export async function generatePreview(config: any) {
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
  
  return response.json();
}

/**
 * Schedule a report to be sent at a specific time
 */
export async function scheduleReport(config: any) {
  const response = await fetch('/api/scheduler', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      config,
      scheduleTime: config.scheduleTime,
    }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to schedule report');
  }
  
  return response.json();
}

/**
 * Get all scheduled reports
 */
export async function getScheduledReports() {
  const response = await fetch('/api/scheduler', {
    method: 'GET',
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch scheduled reports');
  }
  
  return response.json();
}

/**
 * Delete a scheduled report
 */
export async function deleteScheduledReport(jobId: string) {
  const response = await fetch('/api/scheduler', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jobId,
    }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to delete scheduled report');
  }
  
  return response.json();
}

/**
 * Send a WhatsApp message with the report
 */
export async function sendWhatsAppMessage(reportData: any, config: any) {
  const response = await fetch('/api/whatsapp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      reportData,
      whatsappNumbers: config.whatsappNumbers,
      messagingOption: config.messagingOption,
      twilioConfig: config.twilioConfig,
    }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to send WhatsApp message');
  }
  
  return response.json();
}