#!/bin/bash

# Script to publish wiki documentation to GitHub
# Usage: ./scripts/publish-wiki.sh

set -e  # Exit on any error

echo "Publishing Wiki Documentation to GitHub"

# Check if we're in the right directory
if [ ! -d "wiki" ]; then
    echo "Error: wiki directory not found!"
    exit 1
fi

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Error: git is not installed!"
    exit 1
fi

# Get repository name from git config
REPO_URL=$(git remote get-url origin 2>/dev/null)
if [ -z "$REPO_URL" ]; then
    echo "Error: No git remote origin found!"
    echo "Please run this script from the root of your git repository"
    exit 1
fi

echo "Repository URL: $REPO_URL"

# Extract repository name
if [[ $REPO_URL == *".git" ]]; then
    REPO_NAME=$(basename "$REPO_URL" .git)
else
    REPO_NAME=$(basename "$REPO_URL")
fi

echo "Repository name: $REPO_NAME"

# Create wiki repository name
WIKI_REPO="${REPO_NAME}.wiki"

# Check if wiki directory already exists
if [ -d "${WIKI_REPO}" ]; then
    echo "Wiki directory already exists. Updating..."
    cd "${WIKI_REPO}"
    git pull origin main 2>/dev/null || echo "Could not pull from origin, continuing with local files..."
else
    echo "Creating new wiki repository locally..."
    mkdir "${WIKI_REPO}"
    cd "${WIKI_REPO}"
    git init
    # Extract the base URL (handle both HTTPS and SSH formats)
    if [[ $REPO_URL == https://* ]]; then
        # HTTPS format
        BASE_URL=$(echo "$REPO_URL" | sed 's/\.git$//')
        WIKI_URL="${BASE_URL}.wiki.git"
    else
        # SSH format (git@github.com:username/repo.git)
        USERNAME_REPO=$(echo "$REPO_URL" | cut -d: -f2 | sed 's/\.git$//')
        WIKI_URL="git@github.com:${USERNAME_REPO}.wiki.git"
    fi
    
    echo "Wiki URL: $WIKI_URL"
    git remote add origin "$WIKI_URL"
fi

# Copy wiki files from the main repository
echo "Copying wiki files..."
cp -r ../wiki/* .

# Configure git user if not already set
git config user.email "wiki-publisher@localhost" 2>/dev/null || true
git config user.name "Wiki Publisher" 2>/dev/null || true

# Add all files
echo "Adding files to git..."
git add .

# Check if there are changes to commit
if ! git diff-index --quiet HEAD --; then
    echo "Committing changes..."
    git commit -m "Update wiki documentation
    
    Automated update of wiki documentation including:
    - Home page and navigation
    - Quick start guide
    - Installation instructions
    - Usage documentation
    - Development guide
    - Deployment options
    - Testing documentation
    - CI/CD workflows
    - API documentation
    - Database schema
    - Environment configuration
    - Troubleshooting guide
    - FAQ
    - Contributing guidelines"
    
    echo "Pushing to GitHub..."
    # Try to push, if it fails because the branch doesn't exist, create it
    git push origin main 2>/dev/null || {
        echo "Creating main branch and pushing..."
        git push -u origin main
    }
    
    echo "Wiki published successfully!"
else
    echo "No changes to commit. Wiki is up to date."
fi

cd ..

echo "Wiki publishing complete!"
echo "You can view your wiki at: https://github.com/$(echo $REPO_URL | cut -d: -f2 | cut -d/ -f1-2 | sed 's/\.git$//')/wiki"