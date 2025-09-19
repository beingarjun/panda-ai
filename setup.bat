@echo off
REM Panda AI - Quick Setup Script for Windows

echo 🐼 Setting up Panda AI...

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
call npm --workspace server install
call npm --workspace web install

REM Create environment file
if not exist .env (
    echo 📝 Creating environment file...
    copy .env.example .env
    echo ✅ Created .env file - please edit with your OAuth credentials
) else (
    echo ✅ .env file already exists
)

REM Build server
echo 🔨 Building server...
call npm --workspace server run build

REM Build web
echo 🌐 Building web...
call npm --workspace web run build

echo 🎉 Setup complete!
echo.
echo 📋 Next steps:
echo 1. Edit .env with your OAuth credentials
echo 2. Start development: npm run dev
echo 3. Or deploy using the DEPLOYMENT.md guide
echo.
echo 🚀 Happy coding!
