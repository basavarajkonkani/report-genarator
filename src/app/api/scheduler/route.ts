import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for scheduled jobs (in a production app, use a database)
let scheduledJobs: any[] = [];

// Function to add a new scheduled job
export async function POST(request: NextRequest) {
  try {
    const { config, scheduleTime } = await request.json();
    
    if (!config || !scheduleTime) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }
    
    // Generate a unique ID for the job
    const jobId = Date.now().toString();
    
    // Parse the schedule time (HH:MM format)
    const [hours, minutes] = scheduleTime.split(':').map(Number);
    
    // Create a new scheduled job
    const newJob = {
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
    
    return NextResponse.json({
      success: true,
      jobId,
      message: `Report scheduled for ${scheduleTime}`,
    });
  } catch (error: any) {
    console.error('Error scheduling report:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to schedule report' },
      { status: 500 }
    );
  }
}

// Function to get all scheduled jobs
export async function GET() {
  try {
    return NextResponse.json({
      jobs: scheduledJobs,
    });
  } catch (error: any) {
    console.error('Error fetching scheduled jobs:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch scheduled jobs' },
      { status: 500 }
    );
  }
}

// Function to delete a scheduled job
export async function DELETE(request: NextRequest) {
  try {
    const { jobId } = await request.json();
    
    if (!jobId) {
      return NextResponse.json(
        { error: 'Missing job ID' },
        { status: 400 }
      );
    }
    
    // Find the job index
    const jobIndex = scheduledJobs.findIndex(job => job.id === jobId);
    
    if (jobIndex === -1) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }
    
    // Remove the job from the array
    scheduledJobs.splice(jobIndex, 1);
    
    return NextResponse.json({
      success: true,
      message: 'Scheduled job deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting scheduled job:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete scheduled job' },
      { status: 500 }
    );
  }
}