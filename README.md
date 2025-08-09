# GitHub Daily Report to WhatsApp Bot

A modern web application that automates daily work reporting by summarizing GitHub commits and sending them as formatted WhatsApp messages to team members at a fixed time.

## Features

- **GitHub Integration**: Fetch today's commits, filter by user and repo
- **Commit Summary**: Group by repo and author with optional AI-powered natural language summaries
- **WhatsApp Messaging**: Support for both Twilio API (paid) and pywhatkit (free, via WhatsApp Web)
- **Scheduling**: Automated daily reports at your preferred time
- **Modern UI**: Built with Next.js and Tailwind CSS
- **Backend API**: RESTful API endpoints for GitHub data fetching, WhatsApp messaging, and report scheduling

## Screenshots

![Dashboard](https://via.placeholder.com/800x450.png?text=GitHub+Report+Dashboard)

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn
- GitHub Personal Access Token
- WhatsApp account

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/github-report-whatsapp-bot.git
   cd github-report-whatsapp-bot
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   GITHUB_TOKEN=your_github_token
   # If using Twilio
   TWILIO_ACCOUNT_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_whatsapp_number
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Backend API

The application includes several API endpoints:

- **GET/POST /api/github**: Fetches commit data from GitHub repositories and generates formatted reports
- **POST /api/whatsapp**: Sends formatted reports to WhatsApp using either PyWhatKit or Twilio
- **GET/POST/DELETE /api/scheduler**: Manages scheduled report jobs

## Configuration

### GitHub Settings

- **GitHub Token**: Personal access token with `repo` scope
- **Repositories**: List of repositories to monitor (format: `username/repo-name`)
- **GitHub Usernames**: List of GitHub usernames to track

### WhatsApp Settings

- **Integration Method**: Choose between PyWhatKit (free) or Twilio API (paid)
- **WhatsApp Numbers**: List of recipient phone numbers (with country code)

### Scheduling

- **Schedule Time**: Set the time for daily reports (default: 6:00 PM)
- **Message Format**: Choose between default, compact, detailed, or custom formats

## Technical Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **GitHub API**: REST API
- **WhatsApp Messaging**: Twilio / pywhatkit
- **Scheduling**: CRON jobs
- **AI Summary**: OpenAI (optional)

## Limitations

- pywhatkit requires WhatsApp Web to be logged in
- Twilio requires business approval and payment
- Timezone handling needs to be configured properly

## Future Improvements

- Web UI for report customization
- Multi-user broadcast capabilities
- Weekly summary option
- Google Sheets or Notion output
- Slack/Telegram support

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgments

- Created by Nighan2 Labs
- Built with Next.js and Tailwind CSS# Force update
