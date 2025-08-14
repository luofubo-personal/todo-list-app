# 🔧 CI/CD Configuration Guide

## 🎯 Current CI/CD Trigger Configuration

### ✅ **Optimized for Development Workflow**

The CI/CD pipelines have been configured to **minimize unnecessary runs** while maintaining quality gates:

## 📋 **Workflow Trigger Summary**

### 1. **Basic CI Pipeline** (`basic-ci.yml`)
- **Triggers**: 
  - ✅ Push to `main` branch only
  - ✅ Pull requests to `main` branch
  - ✅ Manual workflow dispatch
- **Purpose**: Fast validation and testing
- **Duration**: ~3-5 minutes

### 2. **Full CI/CD Pipeline** (`ci-cd.yml`)
- **Triggers**:
  - ✅ Push to `main` branch only
  - ✅ Pull requests to `main` branch
  - ✅ Manual workflow dispatch
- **Purpose**: Complete build, test, security scan, and deploy
- **Duration**: ~8-12 minutes

### 3. **PR Validation** (`pr-validation.yml`)
- **Triggers**:
  - ✅ Pull requests to `main` or `develop` branches
  - ✅ PR events: opened, synchronize, reopened
- **Purpose**: Comprehensive PR validation
- **Duration**: ~6-10 minutes

### 4. **Release Pipeline** (`release.yml`)
- **Triggers**:
  - ✅ Git tags matching `v*.*.*`
  - ✅ Manual workflow dispatch
- **Purpose**: Production release management
- **Duration**: ~5-8 minutes

## 🚫 **What WON'T Trigger CI/CD**

### **Feature Branch Development**
- ❌ Pushes to feature branches (e.g., `FeatureImprovement`)
- ❌ Commits to development branches
- ❌ Work-in-progress commits
- ❌ Experimental changes

### **Benefits of This Configuration**
- 🚀 **Faster development** - No CI/CD overhead on feature branches
- 💰 **Reduced costs** - Fewer GitHub Actions minutes used
- ⚡ **Better performance** - No queue delays for development work
- 🎯 **Quality gates** - Still validates before merging to main

## 🔄 **Development Workflow**

### **Recommended Process**
1. **Create feature branch** (e.g., `FeatureImprovement`)
2. **Develop and commit** freely without CI/CD triggers
3. **Test locally** using `npm test` and `dotnet test`
4. **Create pull request** to `main` → Triggers PR validation
5. **Merge to main** → Triggers full CI/CD pipeline

### **Local Testing Commands**
```bash
# Frontend testing
cd frontend/angular-app
npm test                    # Run unit tests
npm run lint               # Check code quality
npm run build              # Verify build

# Backend testing
cd backend/TodoApi.Tests
dotnet test                # Run unit tests
dotnet build               # Verify build
```

## 🎛️ **Manual Control Options**

### **Force CI/CD on Feature Branch**
If you need to run CI/CD on a feature branch:

1. **Manual Trigger**: Use GitHub Actions "Run workflow" button
2. **Temporary Enable**: Modify workflow files to include your branch
3. **Local Validation**: Run tests locally before pushing

### **Skip CI/CD on Main Branch**
If you need to push to main without triggering CI/CD:

```bash
git commit -m "Your commit message [skip ci]"
```

### **Re-enable Full Triggers**
To restore original behavior, modify workflow files:

```yaml
on:
  push:
    branches: [ main, develop, 'feature/*' ]  # Add feature branches
```

## 🔧 **Advanced Configuration**

### **Path-Based Triggers**
You can also configure workflows to only run when specific files change:

```yaml
on:
  push:
    branches: [ main ]
    paths:
      - 'frontend/**'      # Only frontend changes
      - 'backend/**'       # Only backend changes
      - '.github/**'       # Only workflow changes
```

### **Conditional Jobs**
Skip certain jobs based on conditions:

```yaml
jobs:
  frontend-ci:
    if: contains(github.event.head_commit.message, '[frontend]')
```

## 📊 **Monitoring & Metrics**

### **GitHub Actions Usage**
- **Before**: ~40-60 minutes per day (all pushes)
- **After**: ~10-20 minutes per day (main + PRs only)
- **Savings**: ~60-70% reduction in CI/CD minutes

### **Development Speed**
- **Feature development**: No CI/CD delays
- **Immediate feedback**: Local testing provides instant results
- **Quality assurance**: PR validation ensures quality before merge

## 🆘 **Troubleshooting**

### **If CI/CD Doesn't Run When Expected**
1. Check branch name matches trigger configuration
2. Verify you're pushing to the correct branch
3. Check for `[skip ci]` in commit messages
4. Review workflow file syntax

### **If You Need Emergency CI/CD**
1. Use manual workflow dispatch
2. Create a temporary PR to main
3. Modify workflow triggers temporarily

---

**🎯 Optimized for efficient development with quality gates**  
*Last Updated: January 2025*
