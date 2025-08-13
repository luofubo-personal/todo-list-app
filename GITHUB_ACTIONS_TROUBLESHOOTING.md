# 🔧 GitHub Actions Troubleshooting Guide

This guide helps resolve common GitHub Actions issues in the Todo List Application CI/CD pipeline.

## 🚨 Common Errors and Solutions

### 1. "Resource not accessible by integration"

**Error**: `HttpError: Resource not accessible by integration`

**Cause**: Missing or insufficient permissions in workflow files.

**Solution**: ✅ **FIXED** - Added comprehensive permissions to all workflows:
```yaml
permissions:
  contents: read/write
  actions: read
  checks: write
  pull-requests: write
  statuses: write
  packages: write
  security-events: write
```

### 2. "No test report files were found"

**Error**: `Error: No test report files were found`

**Cause**: Test result files not generated in expected locations or formats.

**Solution**: ✅ **FIXED** - Updated test configurations:
- Backend: Added `--logger trx --results-directory ./TestResults`
- Frontend: Added `karma-junit-reporter` and proper configuration
- Added debugging steps to list generated files

### 3. External Service Token Errors

**Error**: Various errors related to SonarCloud, Snyk, Codecov tokens

**Cause**: Missing or invalid external service tokens.

**Solution**: ✅ **FIXED** - Made external services conditional:
```yaml
- name: Run SonarCloud Scan
  if: ${{ secrets.SONAR_TOKEN != '' }}
  # ... rest of step
```

## 🛠️ Available Workflows

### 1. Basic CI Pipeline (`basic-ci.yml`) - **RECOMMENDED**
- ✅ **No external dependencies required**
- ✅ **Works out of the box**
- ✅ **Comprehensive testing**
- ✅ **Integration tests**
- ✅ **Security checks**

**Use this workflow if**:
- You want immediate CI/CD functionality
- You don't have external service tokens set up
- You need reliable, basic CI/CD

### 2. Full CI/CD Pipeline (`ci-cd.yml`) - **ADVANCED**
- 🔧 **Requires external service setup**
- 🚀 **Full deployment capabilities**
- 📊 **Advanced reporting**

**Use this workflow if**:
- You have set up external services (SonarCloud, Codecov, etc.)
- You need deployment to Azure
- You want advanced code quality reporting

### 3. PR Validation (`pr-validation.yml`) - **COMPREHENSIVE**
- 🔍 **Extensive PR checks**
- 🧪 **Multi-platform testing**
- 🛡️ **Security validation**

## 🔑 Required Secrets (for full workflows)

### External Services (Optional)
```bash
# Code Quality
SONAR_TOKEN=your_sonarcloud_token
CODECOV_TOKEN=your_codecov_token
SNYK_TOKEN=your_snyk_token

# Deployment (if using Azure)
AZURE_WEBAPP_PUBLISH_PROFILE=your_azure_profile
AZURE_STATIC_WEB_APPS_API_TOKEN=your_swa_token
```

### How to Add Secrets
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add the secret name and value

## 🚀 Quick Start Guide

### Option 1: Use Basic CI (Recommended)
1. The `basic-ci.yml` workflow is ready to use
2. No additional setup required
3. Push code to trigger the workflow
4. Check the Actions tab for results

### Option 2: Set Up Full CI/CD
1. Add required secrets to your repository
2. Configure external services (SonarCloud, Codecov)
3. Update Azure deployment settings
4. Enable the full CI/CD workflow

## 🔍 Debugging Steps

### 1. Check Workflow Permissions
```yaml
permissions:
  contents: read
  actions: read
  checks: write
  pull-requests: write
```

### 2. Verify Test File Generation
Look for these debugging steps in workflow logs:
- "List test results (debug)"
- "Contents of TestResults directory"
- "Contents of test-results directory"

### 3. Check External Service Status
- Verify tokens are correctly set in repository secrets
- Check if external services are accessible
- Review conditional logic in workflows

## 📊 Workflow Status Indicators

### ✅ Success Indicators
- All tests pass
- Artifacts uploaded successfully
- No security issues found
- Integration tests complete

### ❌ Failure Indicators
- Test failures
- Build errors
- Security vulnerabilities
- Missing dependencies

### ⚠️ Warning Indicators
- External service unavailable
- Optional steps skipped
- Coverage below threshold

## 🛡️ Security Best Practices

### 1. Token Management
- Never commit tokens to code
- Use GitHub Secrets for sensitive data
- Make external services conditional
- Set appropriate token permissions

### 2. Workflow Security
- Use specific action versions (not @master)
- Limit workflow permissions
- Validate inputs in workflow_dispatch
- Use environment protection rules

## 📈 Performance Optimization

### 1. Caching
- NuGet packages cached automatically
- npm packages cached automatically
- Docker layers optimized

### 2. Parallel Execution
- Backend and frontend tests run in parallel
- Multiple jobs execute simultaneously
- Matrix builds for multi-platform testing

## 🔄 Workflow Triggers

### Automatic Triggers
- Push to `main` or `develop` branches
- Pull requests to `main`
- New tags (for releases)

### Manual Triggers
- `workflow_dispatch` for manual runs
- Repository dispatch for external triggers

## 📞 Getting Help

### 1. Check Workflow Logs
- Go to Actions tab in GitHub
- Click on failed workflow
- Expand failed steps
- Look for error messages

### 2. Common Solutions
- Re-run failed jobs
- Check repository secrets
- Verify branch protection rules
- Update action versions

### 3. Debug Locally
```bash
# Test backend locally
dotnet test backend/TodoApi.Tests/

# Test frontend locally
cd frontend/angular-app
npm test -- --watch=false --browsers=ChromeHeadless

# Build Docker containers
docker-compose up --build
```

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Action Marketplace](https://github.com/marketplace?type=actions)
- [Security Hardening](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)

---

**Last Updated**: January 2025  
**Status**: All major issues resolved ✅
