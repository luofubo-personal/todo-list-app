# GitHub Wiki Setup

This directory contains all the wiki pages for the Todo List Application. To push these pages to your GitHub wiki, follow these steps:

## Prerequisites

1. Ensure you have git installed on your system
2. Make sure you have write access to the GitHub repository

## Steps to Push Wiki to GitHub

1. **Clone the wiki repository** (if it doesn't exist yet):
   ```bash
   git clone https://github.com/your-username/todo-list-app.wiki.git
   ```

2. **Copy the wiki files** to the wiki repository directory

3. **Navigate to the wiki directory**:
   ```bash
   cd todo-list-app.wiki
   ```

4. **Add all files**:
   ```bash
   git add .
   ```

5. **Commit the changes**:
   ```bash
   git commit -m "Add comprehensive wiki documentation"
   ```

6. **Push to GitHub**:
   ```bash
   git push origin main
   ```

## Wiki Pages Included

- Home.md - Overview and navigation
- Quick-Start-Guide.md - Fastest way to get started
- Installation.md - Detailed installation instructions
- Usage.md - How to use the application
- Development.md - Guide for developers
- Deployment.md - Deployment options and instructions
- Testing.md - Testing guide for frontend and backend
- CI-CD.md - Continuous integration and deployment
- API-Documentation.md - Backend API documentation
- Database-Schema.md - Database structure and configuration
- Environment-Configuration.md - Environment-specific settings
- Troubleshooting.md - Solutions for common issues
- FAQ.md - Frequently asked questions
- Contributing.md - Guidelines for contributors

## Updating the Wiki

To update the wiki in the future:

1. Make changes to the markdown files
2. Add and commit the changes:
   ```bash
   git add .
   git commit -m "Update wiki documentation"
   ```
3. Push to GitHub:
   ```bash
   git push origin main
   ```

The wiki will be automatically updated on GitHub after pushing.