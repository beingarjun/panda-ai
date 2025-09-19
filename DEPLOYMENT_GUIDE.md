# 🚀 Deploy to GitHub & Vercel Guide

## Quick Deploy Steps

### 1. Push to GitHub

```bash
# Create a new repository on GitHub.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/panda-ai.git
git push -u origin master
```

### 2. Deploy Backend to Railway (Free)

1. Go to [Railway.app](https://railway.app)
2. Connect your GitHub account
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `panda-ai` repository
5. Railway will auto-detect the Dockerfile and deploy
6. Set these environment variables in Railway dashboard:
   ```
   JWT_SECRET=your-random-secret-here
   SESSION_SECRET=another-random-secret
   CORS_ORIGIN=https://your-frontend.vercel.app
   PORT=8080
   
   # OAuth (optional - for sign-in features)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   MICROSOFT_CLIENT_ID=your-microsoft-client-id
   MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
   ```
7. Copy your Railway app URL (e.g., `https://panda-ai-production.railway.app`)

### 3. Deploy Frontend to Vercel (Free)

1. Go to [Vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect it's a Vite project
5. Configure build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add environment variable:
   ```
   VITE_API_URL=https://your-railway-app.railway.app
   ```
7. Deploy!

### 4. Update Backend URL

After Vercel deployment, update your Railway environment variables:
```
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

## 🔐 OAuth Setup (Optional)

### Google OAuth
1. [Google Cloud Console](https://console.cloud.google.com)
2. Create project → APIs & Services → Credentials
3. Create OAuth 2.0 Client ID
4. Add authorized redirect URI: `https://your-railway-app.railway.app/api/auth/google/callback`
5. Copy Client ID & Secret to Railway environment variables

### Microsoft OAuth
1. [Azure Portal](https://portal.azure.com)
2. Azure Active Directory → App registrations → New registration
3. Add redirect URI: `https://your-railway-app.railway.app/api/auth/microsoft/callback`
4. Certificates & secrets → New client secret
5. Copy Application ID & Secret to Railway environment variables

## 💰 Subscription Features

The app includes a complete subscription system with:

- **Free Plan**: 3 analyses/month, 5 competitors
- **Pro Plan**: Unlimited analyses, 25 competitors ($29/month)
- **Enterprise Plan**: Unlimited everything ($99/month)

### Features:
- Usage tracking and limits
- Paywall with upgrade prompts
- Subscription management
- Progress indicators

**Note**: This is a demo paywall - no real payments are processed.

## 🛠️ Local Development

```bash
# Clone and setup
git clone https://github.com/YOUR_USERNAME/panda-ai.git
cd panda-ai
./setup.bat  # Windows
# or
./setup.sh   # macOS/Linux

# Edit environment variables
cp .env.example .env
# Add your OAuth credentials

# Start development
npm run dev
```

## 📊 Architecture

- **Frontend**: React + Vite + TypeScript (Vercel)
- **Backend**: Express + TypeScript + In-memory DB (Railway)
- **Auth**: JWT + OAuth (Google, Microsoft)
- **Subscriptions**: Usage tracking + paywall system

## 🎯 Free Hosting Limits

- **Railway**: 500 hours/month, 1GB RAM
- **Vercel**: Unlimited static hosting, 100GB bandwidth
- **Total Cost**: $0/month for development and testing

## 🔧 Environment Variables

### Backend (Railway)
```env
# Required
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret
CORS_ORIGIN=https://your-frontend.vercel.app
PORT=8080

# OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
```

### Frontend (Vercel)
```env
VITE_API_URL=https://your-backend.railway.app
```

## 🚀 Deployment Commands

```bash
# Build everything locally
npm run build

# Test locally
npm run dev

# Deploy manually (if needed)
# Frontend: Build in web/dist and upload to Vercel
# Backend: Push to GitHub, Railway auto-deploys
```

## 📝 Custom Domain (Optional)

1. **Vercel**: Project Settings → Domains → Add custom domain
2. **Railway**: Project Settings → Domains → Add custom domain
3. Update environment variables with new domains

## 🎉 You're Live!

Once deployed, you'll have:
- ✅ Professional AI competitor analysis tool
- ✅ OAuth authentication (Google, Microsoft)
- ✅ Subscription system with usage limits
- ✅ Modern, responsive UI
- ✅ Free hosting for development

**Demo URL**: `https://your-app.vercel.app`

Share your live application and start analyzing competitors! 🐼🚀
