#!/bin/bash

# Panda AI - Quick Setup Script
echo "🐼 Setting up Panda AI..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install
npm --workspace server install
npm --workspace web install

# Create environment file
if [ ! -f .env ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env
    echo "✅ Created .env file - please edit with your OAuth credentials"
else
    echo "✅ .env file already exists"
fi

# Build server
echo "🔨 Building server..."
npm --workspace server run build

# Build web
echo "🌐 Building web..."
npm --workspace web run build

echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env with your OAuth credentials"
echo "2. Start development: npm run dev"
echo "3. Or deploy using the DEPLOYMENT.md guide"
echo ""
echo "🚀 Happy coding!"
