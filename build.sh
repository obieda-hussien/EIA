#!/bin/bash

# Build script for GitHub Pages deployment
# Optimizes paths and assets for static hosting

echo "🚀 Starting GitHub Pages build process..."

# Create build directory
BUILD_DIR="dist"
mkdir -p $BUILD_DIR

# Copy all files to build directory
echo "📁 Copying files to build directory..."

# Remove existing build directory if it exists
rm -rf $BUILD_DIR

# Create fresh build directory
mkdir -p $BUILD_DIR

# Copy all files except build directory itself
find . -maxdepth 1 ! -name . ! -name $BUILD_DIR -exec cp -r {} $BUILD_DIR/ \;

# Remove unnecessary files from build
echo "🧹 Cleaning up build directory..."
cd $BUILD_DIR
rm -rf .git .github node_modules package*.json build.sh
rm -f .nojekyll _config.yml

# Fix absolute paths for GitHub Pages
echo "🔧 Fixing absolute paths for GitHub Pages..."

# Fix favicon and asset paths in HTML files
find . -name "*.html" -type f -exec sed -i 's|href="/|href="./|g' {} \;
find . -name "*.html" -type f -exec sed -i 's|src="/|src="./|g' {} \;

# Fix manifest path
find . -name "*.html" -type f -exec sed -i 's|href="./site.webmanifest"|href="./site.webmanifest"|g' {} \;

# Ensure proper paths for assets
find . -name "*.html" -type f -exec sed -i 's|href="\.\/favicon|href="./favicon|g' {} \;
find . -name "*.html" -type f -exec sed -i 's|href="\.\/apple-touch|href="./apple-touch|g' {} \;

# Fix CSS and JS paths if needed
find . -name "*.html" -type f -exec sed -i 's|href="\.\/css/|href="./css/|g' {} \;
find . -name "*.html" -type f -exec sed -i 's|src="\.\/js/|src="./js/|g' {} \;

# Fix image paths
find . -name "*.html" -type f -exec sed -i 's|src="\.\/images/|src="./images/|g' {} \;

# Update sitemap URLs for GitHub Pages
if [ -f "sitemap.xml" ]; then
    sed -i 's|https://egyptian-institute-alexandria\.edu\.eg|https://obieda-hussien.github.io/EIA|g' sitemap.xml
fi

# Update robots.txt URLs
if [ -f "robots.txt" ]; then
    sed -i 's|https://egyptian-institute-alexandria\.edu\.eg|https://obieda-hussien.github.io/EIA|g' robots.txt
fi

echo "✅ Build process completed successfully!"
echo "📦 Build files are ready in the dist/ directory"