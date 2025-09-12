#!/bin/bash

# Build script for React version
echo "🚀 Building React version of EIA website..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the React application
echo "🔨 Building React application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful! Files are in dist/ directory"
    echo "📊 Build statistics:"
    du -sh dist/*
    echo ""
    echo "🌐 To preview the built version:"
    echo "   npm run preview"
    echo ""
    echo "📦 To deploy:"
    echo "   1. GitHub Pages: Push dist/ contents to gh-pages branch"
    echo "   2. Netlify/Vercel: Connect your repo and build automatically"
    echo "   3. Custom server: Upload dist/ contents to your web server"
else
    echo "❌ Build failed! Please check the errors above"
    exit 1
fi