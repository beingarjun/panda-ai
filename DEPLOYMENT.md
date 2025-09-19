# Deployment Guide - Free Hosting Options

## 🚀 Quick Deploy Options

### Option 1: Railway (Backend) + Vercel (Frontend) [RECOMMENDED]

**Backend on Railway (Free tier: 500 hours/month)**
1. Push your code to GitHub
2. Go to [Railway.app](https://railway.app)
3. Connect your GitHub repo
4. Railway will auto-deploy using the Dockerfile
5. Set environment variables in Railway dashboard
6. Copy your Railway URL for the frontend

**Frontend on Vercel (Free tier: Unlimited)**
1. Go to [Vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Set build settings:
   - Framework: Vite
   - Build Command: `cd web && npm run build`
   - Output Directory: `web/dist`
4. Add environment variable: `VITE_API_URL=https://your-railway-app.railway.app`

### Option 2: Render (Full Stack)

1. Go to [Render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repo
4. Use the render.yaml configuration
5. Set environment variables in Render dashboard

### Option 3: Heroku (Backend) + Netlify (Frontend)

**Backend on Heroku**
1. Install Heroku CLI
2. `heroku create your-app-name`
3. `git push heroku main`
4. Set config vars: `heroku config:set JWT_SECRET=your-secret`

**Frontend on Netlify**
1. Go to [Netlify.com](https://netlify.com)
2. Drag and drop your `web/dist` folder
3. Set environment variables in Netlify dashboard

## 🔐 OAuth Setup

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `https://your-backend-url/api/auth/google/callback`
6. Copy Client ID and Secret to environment variables

### Microsoft OAuth Setup
1. Go to [Azure Portal](https://portal.azure.com)
2. Register new application in Azure AD
3. Add redirect URI: `https://your-backend-url/api/auth/microsoft/callback`
4. Generate client secret
5. Copy Application ID and Secret to environment variables

### Apple OAuth Setup (Optional)
1. Go to [Apple Developer](https://developer.apple.com)
2. Create a Services ID
3. Configure Sign in with Apple
4. Generate and download private key
5. Add to environment variables

## 📋 Environment Variables Checklist

**Required for all deployments:**
- `JWT_SECRET` - Random secret for JWT tokens
- `SESSION_SECRET` - Random secret for sessions
- `CORS_ORIGIN` - Your frontend URL
- `SERVER_URL` - Your backend URL

**For OAuth (at least one required):**
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
- `MICROSOFT_CLIENT_ID` & `MICROSOFT_CLIENT_SECRET`
- `APPLE_CLIENT_ID` & `APPLE_PRIVATE_KEY` (optional)

## 🛠️ Local Development

1. Install dependencies:
   ```bash
   npm install
   npm --workspace server install
   npm --workspace web install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your OAuth credentials
   ```

3. Start development servers:
   ```bash
   # Terminal 1 - Backend
   npm --workspace server run dev
   
   # Terminal 2 - Frontend  
   npm --workspace web run dev
   ```

4. Open http://localhost:5173

## 💾 Database Notes

- Currently uses in-memory database for simplicity
- For production, consider upgrading to:
  - PostgreSQL (free tier on Railway/Render)
  - MongoDB Atlas (free tier)
  - SQLite with persistent storage

## 🔧 Troubleshooting

**OAuth not working?**
- Check redirect URIs match exactly
- Ensure HTTPS in production
- Verify environment variables are set

**Build failing?**
- Check Node.js version (18+ recommended)
- Ensure all dependencies are installed
- Check for TypeScript errors

**CORS errors?**
- Set correct CORS_ORIGIN in backend
- Ensure credentials: true in requests

## 📚 Next Steps

1. Set up OAuth applications
2. Deploy backend to Railway
3. Deploy frontend to Vercel
4. Configure environment variables
5. Test OAuth flows
6. Set up custom domain (optional)

## 💡 Free Tier Limits

- **Railway**: 500 hours/month, 1GB RAM, 1GB storage
- **Vercel**: Unlimited static sites, 100GB bandwidth
- **Render**: 750 hours/month, 512MB RAM
- **Netlify**: 300 build minutes, 100GB bandwidth

Choose the combination that best fits your needs!
