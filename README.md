# CitizenAssist - AI-Powered Community Assistant Platform

## Project info

**CitizenAssist** is a professional AI assistant platform offering specialized agents for education, career guidance, health, finance, and more. Users can sign in to save their conversation history locally, and optionally integrate with Google Gemini AI and ElevenLabs text-to-speech for enhanced functionality.

### Key Features
- 🔐 **User Authentication**: Sign in to save chat history (localStorage only)
- 🤖 **10 Specialized AI Agents**: Education, Career, Health, Finance, Civic, and more
- 🔗 **Optional API Integrations**: Google Gemini AI and ElevenLabs TTS
- 📱 **Responsive Design**: Works on desktop and mobile
- 🎯 **Professional Interface**: Clean, modern UI with shadcn/ui components

**URL**: https://lovable.dev/projects/f11c870c-d994-430f-ae6b-b41e18266bc1

## Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Keys (Optional)

For enhanced AI features, copy the example environment file and add your API keys:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your keys:
```bash
# Google Gemini API Key (for AI responses)
VITE_GEMINI_API_KEY=your_gemini_key_here

# ElevenLabs API Key (for text-to-speech)
VITE_ELEVENLABS_API_KEY=your_elevenlabs_key_here
```

**🔒 Security Note**: Never commit real API keys to version control. The `.env.local` file is ignored by git.

### 3. Start Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## API Key Setup

### Google Gemini API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env.local` as `VITE_GEMINI_API_KEY`

### ElevenLabs API
1. Sign up at [ElevenLabs](https://elevenlabs.io)
2. Go to your profile settings to get your API key
3. Add it to your `.env.local` as `VITE_ELEVENLABS_API_KEY`

## Usage

1. **Without API Keys**: The app works with mock responses for demonstration
2. **With Gemini Key**: Gets real AI responses from Google's Gemini model
3. **With ElevenLabs Key**: Adds text-to-speech audio for AI responses
4. **User Sign-in**: Click "Sign in" to save your chat history locally

## Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: shadcn/ui + Tailwind CSS
- **State Management**: React hooks + localStorage
- **AI Integration**: Google Gemini API (optional)
- **TTS**: ElevenLabs API (optional)
- **Authentication**: Local-only (no server required)

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f11c870c-d994-430f-ae6b-b41e18266bc1) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm install

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev

# Step 5: (Optional) Configure API keys in .env.local for enhanced features
cp .env.example .env.local
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f11c870c-d994-430f-ae6b-b41e18266bc1) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
