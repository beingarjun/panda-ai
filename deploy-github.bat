@echo off
echo 🚀 Deploying Panda AI to GitHub...

REM Check if git remote exists
git remote | findstr "origin" >nul
if %errorlevel% == 0 (
    echo ✅ Git remote 'origin' already exists
    echo 📤 Pushing to existing repository...
    git push origin master
) else (
    echo ❌ No git remote found!
    echo.
    echo Please create a repository on GitHub.com first, then run:
    echo git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
    echo git push -u origin master
    echo.
    echo Then follow the deployment guide: ./DEPLOYMENT_GUIDE.md
    pause
    exit /b 1
)

echo.
echo 🎉 Successfully pushed to GitHub!
echo.
echo 📋 Next steps:
echo 1. Deploy backend to Railway: https://railway.app
echo 2. Deploy frontend to Vercel: https://vercel.com
echo 3. Follow the complete guide: ./DEPLOYMENT_GUIDE.md
echo.
echo 🐼 Your AI competitor analysis tool is ready for deployment!
pause
