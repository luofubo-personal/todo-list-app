# 🔄 CI/CD Documentation

Comprehensive documentation for the continuous integration and continuous deployment pipelines of the Todo List Application, powered by GitHub Actions.

## 🚀 Overview

The Todo List Application features a robust CI/CD system with 4 distinct GitHub Actions workflows designed for different purposes:

1. **Basic CI** - Fast validation and testing (auto-triggers)
2. **CI/CD** - Full build, test, security scan (manual trigger)
3. **PR Validation** - Comprehensive PR validation (manual trigger)
4. **Release** - Production release management (tag triggers)

## 🔄 Workflow Details

### 1. Basic CI Workflow (`basic-ci.yml`)

**Status**: ✅ **Active**
**Trigger**: Automatically on push to main branch
**Purpose**: Quick validation and testing
**Duration**: 3-5 minutes

#### **Jobs Performed**:
- **Code Quality Checks**
  - .NET code formatting verification
  - Angular linting
  - TypeScript formatting checks
- **Fast Testing**
  - Unit tests for both frontend and backend
  - Quick feedback on code changes
- **Artifact Management**
  - Test results collection
  - Code coverage reports

#### **When It Runs**:
- Every push to the main branch
- Provides immediate feedback on code quality
- Ensures basic functionality remains intact

### 2. Full CI/CD Workflow (`ci-cd.yml`)

**Status**: ⏸️ **Manual**
**Trigger**: Manual only (workflow_dispatch)
**Purpose**: Full build, test, security scan
**Duration**: 8-12 minutes

#### **Jobs Performed**:
- **Comprehensive Testing**
  - Multi-platform testing (Windows, macOS, Linux)
  - Multi-version testing (.NET 9, Node.js 18/20)
  - Integration tests with in-memory database
- **Security Scanning**
  - Snyk security analysis
  - npm audit for frontend dependencies
  - OWASP Dependency Check
- **Performance Testing**
  - Load testing when labeled
  - Performance metrics collection
- **Deployment Simulation**
  - Build verification for all platforms
  - Artifact packaging

#### **When to Use**:
- Before major releases
- When security validation is needed
- For comprehensive code validation

### 3. PR Validation Workflow (`pr-validation.yml`)

**Status**: ⏸️ **Manual**
**Trigger**: Manual only (workflow_dispatch)
**Purpose**: Comprehensive PR validation
**Duration**: 6-10 minutes

#### **Jobs Performed**:
- **Code Quality & Linting**
  - .NET code formatting verification
  - Angular linting with detailed reports
  - TypeScript formatting checks
- **Comprehensive Testing**
  - Multi-platform testing (Windows, macOS, Linux)
  - Multi-version compatibility testing
  - Integration tests with API endpoints
- **Security Validation**
  - Snyk security scanning
  - npm audit for vulnerabilities
  - OWASP Dependency Check
- **Performance Tests**
  - Load testing (when PR labeled with "performance")
  - Resource usage monitoring
- **PR Summary Generation**
  - Automated comment with validation results
  - Clear pass/fail indicators
  - Detailed test result links

#### **When to Use**:
- Before merging pull requests
- For comprehensive code review validation
- When security or performance validation is needed

### 4. Release Workflow (`release.yml`)

**Status**: ✅ **Active**
**Trigger**: Tag creation (e.g., v1.0.0)
**Purpose**: Production release management
**Duration**: 5-8 minutes

#### **Jobs Performed**:
- **Release Build**
  - Production-optimized builds
  - Artifact packaging with versioning
  - Release notes generation
- **Quality Gates**
  - Final code quality checks
  - Security scanning
  - Test validation
- **Deployment**
  - Automated deployment to staging
  - Production deployment (when approved)
  - Rollback preparation

#### **When It Runs**:
- When a new tag is created
- For official releases
- Automated production deployment

## ⚙️ Configuration

### Environment Variables

The workflows use the following environment variables:

```yaml
env:
  DOTNET_VERSION: '9.0.x'
  NODE_VERSION: '22.x'
```

### Secrets Required

For full functionality, configure these repository secrets:

```
# Azure Deployment (if using Azure)
AZURE_WEBAPP_PUBLISH_PROFILE_STAGING
AZURE_WEBAPP_PUBLISH_PROFILE
AZURE_STATIC_WEB_APPS_API_TOKEN_STAGING
AZURE_STATIC_WEB_APPS_API_TOKEN

# Security Scanning
SNYK_TOKEN
CODECOV_TOKEN
```

### Variables

Repository variables for customization:

```
ENABLE_SNYK: 'true'  # Enable/disable Snyk scanning
ENABLE_SONAR: 'false'  # Enable/disable SonarCloud (currently disabled)
```

## 🧪 Testing Matrix

### Platforms Tested
- **ubuntu-latest** - Primary testing platform
- **windows-latest** - Windows compatibility
- **macos-latest** - macOS compatibility

### Versions Tested
- **.NET**: 9.0.x
- **Node.js**: 20.x, 22.x

## 🛡️ Security Scanning

### Tools Integrated
1. **Snyk** - Dependency vulnerability scanning
2. **npm audit** - Frontend package security
3. **OWASP Dependency Check** - Comprehensive dependency analysis
4. **Trivy** - Container image scanning (in Docker builds)

### Security Thresholds
- **High/Critical** vulnerabilities block deployment
- **Medium** vulnerabilities require review
- **Low** vulnerabilities are reported but don't block

## 📊 Quality Gates