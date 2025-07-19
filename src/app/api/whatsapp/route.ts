import { NextRequest, NextResponse } from 'next/server';

// Function to format the report for WhatsApp
function formatReport(data: any) {
  let message = `Daily Work Report - ${data.date}\n\n`;

  data.reports.forEach((report: any) => {
    message += `${report.username}\n`;
    
    report.repositories.forEach((repo: any) => {
      message += `\nRepo: ${repo.name}\n`;
      repo.commits.forEach((commit: string) => {
        message += `- ${commit}\n`;
      });
    });
    
    message += '\n';
  });

  return message;
}

// Mock function for sending WhatsApp message via PyWhatKit
// In a real implementation, this would use a server-side Python script or a WhatsApp API service
async function sendViaPyWhatKit(phoneNumbers: string[], message: string) {
  console.log(`Sending message via PyWhatKit to ${phoneNumbers.join(', ')}`);
  console.log('Message content:', message);
  
  // This is a mock implementation
  // In a real app, you would call a Python script or use a service like Twilio
  return {
    success: true,
    message: `Message sent to ${phoneNumbers.length} recipients via PyWhatKit`,
  };
}

// Function to send WhatsApp message via Twilio API
async function sendViaTwilio(phoneNumbers: string[], message: string, twilioConfig: any) {
  try {
    console.log(`Sending message via Twilio to ${phoneNumbers.join(', ')}`);
    console.log('Message content:', message);
    
    // This is a mock implementation
    // In a real app, you would use the Twilio API client
    return {
      success: true,
      message: `Message sent to ${phoneNumbers.length} recipients via Twilio`,
    };
  } catch (error: any) {
    console.error('Error sending message via Twilio:', error);
    return {
      success: false,
      error: error.message || 'Failed to send message via Twilio',
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { reportData, whatsappNumbers, messagingOption, twilioConfig } = await request.json();
    
    if (!reportData || !whatsappNumbers) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }
    
    const phoneNumberList = whatsappNumbers.split(',').map((num: string) => num.trim()).filter(Boolean);
    const formattedMessage = formatReport(reportData);
    
    let result;
    
    // Send message based on selected messaging option
    if (messagingOption === 'twilio' && twilioConfig) {
      result = await sendViaTwilio(phoneNumberList, formattedMessage, twilioConfig);
    } else {
      // Default to PyWhatKit
      result = await sendViaPyWhatKit(phoneNumberList, formattedMessage);
    }
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
      });
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to send WhatsApp message' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error sending WhatsApp message:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send WhatsApp message' },
      { status: 500 }
    );
  }
}