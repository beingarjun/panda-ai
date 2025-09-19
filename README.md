# 🐼 Panda AI

A full-stack TypeScript application for AI-powered competitor analysis with OAuth authentication.

## ✨ Features

- 🔐 **Multi-Provider OAuth**: Google, Microsoft Sign-In
- 🤖 **AI Analysis Pipeline**: Automated competitor research
- 📊 **Dashboard**: Real-time analytics and insights
- 💰 **Subscription System**: Free, Pro, Enterprise plans with usage limits
- 🚫 **Smart Paywall**: Usage tracking with upgrade prompts
- 🎨 **Modern UI**: React with responsive design
- 🚀 **Fast Development**: Hot reload with Vite
- 📦 **TypeScript**: Full type safety
- 🐳 **Docker Ready**: Containerized deployment
- ☁️ **Free Hosting**: Deploy to Vercel + Railway at $0 cost

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Git

### Option 1: Automated Setup (Recommended)

**Windows:**
```powershell
git clone https://github.com/yourusername/panda-ai.git
cd panda-ai
./setup.bat
```

**macOS/Linux:**
```bash
git clone https://github.com/yourusername/panda-ai.git
cd panda-ai
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/yourusername/panda-ai.git
   cd panda-ai
   npm install
   npm --workspace server install
   npm --workspace web install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your OAuth credentials
   ```

3. **Start development servers:**
   ```bash
   # Terminal 1 - Backend (http://localhost:3000)
   npm --workspace server run dev
   
   # Terminal 2 - Frontend (http://localhost:5173)
   npm --workspace web run dev
   ```

## 🔐 OAuth Setup

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create project → Enable Google+ API → Create OAuth credentials
3. Add redirect URI: `http://localhost:3000/api/auth/google/callback`
4. Copy Client ID & Secret to `.env`

### Microsoft OAuth
1. Go to [Azure Portal](https://portal.azure.com)
2. Register app in Azure AD → Add redirect URI
3. Generate client secret → Copy to `.env`

### Apple OAuth (Optional)
1. Go to [Apple Developer](https://developer.apple.com)
2. Create Services ID → Configure Sign in with Apple
3. Generate private key → Add to `.env`

## 🌐 Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

### Free Hosting Options:
- **Railway** (Backend) + **Vercel** (Frontend) [Recommended]
- **Render** (Full-stack)
- **Heroku** (Backend) + **Netlify** (Frontend)

### Quick Deploy Steps:
1. **Push to GitHub** → Create repo and push code
2. **Deploy Backend** → Connect Railway to GitHub repo
3. **Deploy Frontend** → Connect Vercel to GitHub repo
4. **Set Environment Variables** → Add OAuth credentials and API URLs

**📖 Complete Guide**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 💰 Subscription System

The app includes a complete freemium model:

### Plans Available:
- **Free**: 3 analyses/month, 5 competitors
- **Pro**: Unlimited analyses, 25 competitors ($29/month)
- **Enterprise**: Unlimited everything ($99/month)

### Features:
- Usage tracking and progress indicators
- Smart paywall with upgrade prompts
- Subscription management dashboard
- OAuth integration for easy signup

**Note**: Demo paywall - no real payments processed

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Authentication**: Passport.js (OAuth) + JWT
- **Database**: In-memory (SQLite for production)

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State**: Context API

## 📱 API Endpoints

### Authentication
```
POST   /api/auth/register     # Email/password signup
POST   /api/auth/login        # Email/password login
POST   /api/auth/logout       # Logout
GET    /api/auth/me          # Get current user
GET    /api/auth/google      # Google OAuth
GET    /api/auth/microsoft   # Microsoft OAuth
GET    /api/auth/apple       # Apple OAuth
```

### Analysis
```
POST   /api/runs            # Create analysis run
GET    /api/runs/:id        # Get run results
GET    /api/competitors     # List competitors
POST   /api/competitors     # Add competitor
```

## Structure

- `server/` - Express TypeScript backend with OAuth
- `web/` - React Vite frontend with authentication
- Root workspace configuration with deployment configs
