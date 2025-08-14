# 📚 API Documentation

Com# 🔄 CI/CD Documentation

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

## 📊 Quality Gates# 🤝 Contributing Guide

Learn how to contribute to the Todo List Application project, following our development standards and workflow.

## 🎯 Welcome Contributors!

Thank you for your interest in contributing to the Todo List Application! This guide will help you understand our development process, coding standards, and contribution workflow.

## 🚀 Getting Started

### 1. Fork and Clone
1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/todo-list-app.git
   cd todo-list-app
   ```

### 2. Set Up Development Environment
Follow the [Installation Guide](Installation) to set up your development environment:
- Install prerequisites (Node.js, .NET SDK, Git)
- Configure environment variables
- Verify setup with quick start guide

### 3. Create a Branch
Create a feature branch for your work:
```bash
git checkout -b feature/your-feature-name
```

## 📋 Development Workflow

### 1. Issue First Approach
Before starting work, check if an issue exists or create one:
- Search [existing issues](https://github.com/your-username/todo-list-app/issues)
- Create a new issue for bugs or feature requests
- Comment on the issue to indicate you're working on it

### 2. Development Process
1. **Plan**: Understand the requirements and approach
2. **Code**: Implement following our coding standards
3. **Test**: Write and run tests for your changes
4. **Document**: Update documentation as needed
5. **Review**: Self-review your code before submitting

### 3. Code Standards

#### Frontend (Angular/TypeScript)
- **ESLint compliance** required (0 errors)
- **TypeScript strict mode** - No `any` types
- **Standalone components** - No NgModules
- **Modern injection** - Use Angular's `inject()` function
- **Reactive patterns** - Use RxJS for async operations

#### Backend (.NET)
- **Clean architecture** - Separation of concerns
- **Entity Framework Core** - Modern ORM patterns
- **Health checks** - Built-in monitoring endpoints
- **OpenAPI documentation** - Self-documenting API
- **C# 10+ features** - Use latest language features

#### General Standards
- **Meaningful commit messages** following conventional commits
- **Descriptive variable and function names**
- **Consistent formatting** (use provided configs)
- **No commented-out code** (use git history instead)
- **Proper error handling** with user-friendly messages

### 4. Testing Requirements
- **Unit tests** for new functionality
- **Integration tests** for API endpoints
- **Frontend tests** for components and services
- **Maintain or improve** overall test coverage
- **Follow existing test patterns** and structures

## 📤 Submitting Changes

### 1. Commit Guidelines
Follow conventional commits format:
```
feat: Add deadline feature to todo items
fix: Resolve todo completion state bug
docs: Update README with new instructions
test: Add tests for todo service
refactor: Improve component structure
chore: Update dependencies
```

### 2. Pull Request Process
1. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**:
   - Use a clear, descriptive title
   - Reference related issues (e.g., "Fixes #123")
   - Provide detailed description of changes
   - Include screenshots for UI changes

3. **Code Review**:
   - Address all review comments
   - Make requested changes
   - Respond to feedback constructively

4. **Merge Requirements**:
   - All CI checks must pass
   - At least one approval from maintainers
   - Code follows project standards
   - Tests pass and coverage is maintained

## 🧪 Testing Guidelines

### Frontend Testing
```bash
cd frontend/angular-app

# Run all tests
npm test

# Run specific test file
npm test -- --include="src/app/todo.service.spec.ts"

# Run tests with coverage
npm run test:coverage
```

### Backend Testing
```bash
cd backend/TodoApi.Tests

# Run all tests
dotnet test

# Run specific test class
dotnet test --filter "TodoControllerTests"
```

### Quality Checks
```bash
# Frontend linting
cd frontend/angular-app
npm run lint

# Backend formatting
cd backend/TodoApi
dotnet format --verify-no-changes
```

## 📚 Documentation Updates

### When to Update Documentation
- Adding new features
- Changing existing functionality
- Modifying APIs
- Updating setup processes

### Documentation Standards
- **Clear and concise** language
- **Consistent formatting** with existing docs
- **Accurate examples** that work
- **Updated screenshots** for UI changes
- **Cross-references** to related sections

## 🐛 Reporting Bugs

### Before Reporting
1. **Search existing issues** to avoid duplicates
2. **Try to reproduce** on the latest main branch
3. **Check documentation** for known issues

### How to Report
Create an issue with:
- **Clear title** summarizing the problem
- **Detailed description** of the issue
- **Steps to reproduce** the problem
- **Expected vs actual behavior**
- **Environment information** (OS, browser, versions)
- **Screenshots or logs** if applicable

## 💡 Feature Requests

### Before Requesting
1. **Search existing issues** for similar requests
2. **Consider if it fits** the project scope
3. **Think about implementation** approach

### How to Request
Create an issue with:
- **Clear title** describing the feature
- **Detailed explanation** of the feature
- **Use cases and benefits**
- **Potential implementation** ideas
- **Impact on existing functionality**

## 🛡️ Security Contributions

### Responsible Disclosure
For security vulnerabilities:
1. **Do NOT** create public issues
2. **Email maintainers** directly with details
3. **Include reproduction** steps if possible
4. **Allow time** for a fix before disclosure

### Security Best Practices
- **Input validation** on all user data
- **Secure coding** practices
- **Dependency updates** for security patches
- **Privacy considerations** for user data

## 🎨 Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone, regardless of:
- Age, body size, disability, ethnicity, gender identity and expression
- Level of experience, education, socio-economic status, nationality
- Personal appearance, race, religion, or sexual identity and orientation

### Our Standards
Examples of positive behavior:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- F# 📊 Database Schema

Documentation for the database schema used in the Todo List Application, supporting both Entity Framework Core and multiple database providers.

## 🗃️ Database Options

The application supports multiple database backends:

1. **In-Memory Database** - Default for development (zero setup)
2. **PostgreSQL** - Production-ready with Docker support
3. **SQL Server** - Enterprise option with Docker profile

## 🏗️ Entity Model

### Todo Entity

The core entity for the application is the `Todo` model:

```csharp
public class Todo
{
    public int Id { get; set; }
    public string Title { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime? Deadline { get; set; }
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| **Id** | `int` | Yes | Unique identifier for the todo item |
| **Title** | `string` | Yes | The todo item description |
| **IsCompleted** | `bool` | Yes | Completion status of the todo |
| **Deadline** | `DateTime?` | No | Optional deadline for the todo |

## 🗄️ Database Context

### TodoContext

The Entity Framework Core context:

```csharp
public class TodoContext : DbContext
{
    public TodoContext(DbContextOptions<TodoContext> options)
        : base(options)
    {
    }

    public DbSet<Todo> Todos { get; set; }
}
```

## 🐘 PostgreSQL Schema

When using PostgreSQL, the database schema is automatically created:

### Tables

#### Todos Table

```sql
CREATE TABLE "Todos" (
    "Id" integer GENERATED BY DEFAULT AS IDENTITY,
    "Title" text NOT NULL,
    "IsCompleted" boolean NOT NULL,
    "Deadline" timestamp with time zone,
    CONSTRAINT "PK_Todos" PRIMARY KEY ("Id")
);
```

### Indexes

```sql
CREATE INDEX "IX_Todos_IsCompleted" ON "Todos" ("IsCompleted");
CREATE INDEX "IX_Todos_Deadline" ON "Todos" ("Deadline");
```

## 🪟 SQL Server Schema

When using SQL Server, the database schema is automatically created:

### Tables

#### Todos Table

```sql
CREATE TABLE [Todos] (
    [Id] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NOT NULL,
    [IsCompleted] bit NOT NULL,
    [Deadline] datetime2 NULL,
    CONSTRAINT [PK_Todos] PRIMARY KEY ([Id])
);
```

### Indexes

```sql
CREATE INDEX [IX_Todos_IsCompleted] ON [Todos] ([IsCompleted]);
CREATE INDEX [IX_Todos_Deadline] ON [Todos] ([Deadline]);
```

## 🧠 In-Memory Database

For development, the application uses an in-memory database that automatically creates the schema:

- No setup required
- Data is lost when the application stops
- Perfect for development and testing
- Identical API to persistent databases

## § Connection Strings

### Development (In-Memory)
```json
{
  "ConnectionStrings": {
    "TodoContext": "InMemory"
  }
}
```

### PostgreSQL
```json
{
  "ConnectionStrings": {
    "TodoContext": "Host=localhost;Port=5432;Database=TodoDb;Username=your-user;Password=your-password"
  }
}
```

### SQL Server
```json
{
  "ConnectionStrings": {
    "TodoContext": "Server=localhost;Database=TodoDb;User Id=your-user;Password=your-password;TrustServerCertificate=true;"
  }
}
```

## 🔄 Migrations

The application uses Entity Framework Core migrations for schema management:

### Adding a Migration
```bash
cd backend/TodoApi
dotnet ef migrations add MigrationName
```

### Updating Database
```bash
dotnet ef database update
```

### Generating SQL Script
```bash
dotnet ef migrations script
```

## 🛠️ Database Operations

#### 🚀 Deployment Guide

Comprehensive deployment guide for the Todo List Application, covering multiple deployment strategies from local development to production-ready cloud deployments.

## ✨ Deployment Options Overview

| Method | Complexity | Time | Best For |
|--------|------------|------|----------|
| **Local Development** | ⭐ Easy | 5 min | Development, testing |
| **Docker Compose** | ⭐⭐ Medium | 10 min | Local production-like |
| **GitHub Actions** | ⭐⭐⭐ Advanced | 15 min | Automated CI/CD |
| **Azure Manual** | ⭐⭐⭐⭐ Expert | 30 min | Custom cloud setup |
| **Terraform IaC** | ⭐⭐⭐⭐⭐ Expert | 45 min | Enterprise deployment |

## 🏃‍♂️ Quick Deployment (Recommended)

### 🚀 Option 1: Local Development (Fastest)

**Perfect for**: Development, testing, demos
**Time**: ~5 minutes
**Requirements**: Node.js 18+, .NET 9 SDK

```bash
# 1. Clone repository
git clone <repository-url>
cd todo-list-app

# 2. Start backend (Terminal 1)
cd backend/TodoApi
ASPNETCORE_ENVIRONMENT=Development dotnet run --urls="http://localhost:5001"

# 3. Start frontend (Terminal 2)
cd frontend/angular-app
npm install
npm start

# 4. Open application
open http://localhost:4200
```

**✅ Features:**
- In-memory database (no setup required)
- Hot reload for development
- Full debugging capabilities
- Zero external dependencies

### 🐳 Option 2: Docker Compose (Production-like)

**Perfect for**: Local production testing, team development
**Time**: ~10 minutes
**Requirements**: Docker, Docker Compose

```bash
# 1. Clone repository
git clone <repository-url>
cd todo-list-app

# 2. Start with PostgreSQL (recommended)
docker-compose up --build

# 3. Alternative: Start with SQL Server
docker-compose --profile sqlserver up --build

# 4. Access application
# Frontend: http://localhost:4200
# Backend: http://localhost:5001
# Database: localhost:5432 (PostgreSQL) or localhost:1433 (SQL Server)
```

**✅ Features:**
- Production-like environment
- Multi-database support
- Container isolation
- Easy cleanup and reset

## 🔄 Automated Deployment (CI/CD)

### 🚀 GitHub Actions (Recommended for Production)

**Perfect for**: Production deployments, team collaboration
**Time**: ~15 minutes setup, automatic thereafter
**Requirements**: GitHub repository, cloud provider account

#### **Setup Steps:**

1. **Fork/Clone Repository**
   ```bash
   git clone <repository-url>
   cd todo-list-app
   ```

2. **Configure Secrets** (GitHub Repository Settings → Secrets)
   ```
   # Azure Deployment (if using Azure)
   AZURE_WEBAPP_PUBLISH_PROFILE_STAGING
   AZURE_WEBAPP_PUBLISH_PROFILE
   AZURE_STATIC_WEB_APPS_API_TOKEN_STAGING
   AZURE_STATIC_WEB_APPS_API_TOKEN
   
   # Optional: Code Coverage
   CODECOV_TOKEN
   ```

3. **Push to Trigger Deployment**
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

#### **Available Workflows:**

- **basic-ci.yml** - Fast validation (3-5 min)
- **ci-cd.yml** - Full deployment (8-12 min)
- **pr-validation.yml** - PR checks (6-10 min)
- **release.yml** - Production releases (5-8 min)

**✅ Features:**
- Automated testing and deployment
- Multi-environment support (staging/production)
- Security scanning with Trivy
- Artifact management
- Zero-downtime deployments

## ☁️ Cloud Deployment

### 🚀 Azure App Service (Manual)

**Perfect for**: Custom Azure deployments, enterprise requirements
**Time**: ~30 minutes
**Requirements**: Azure subscription, Azure CLI

#### **Prerequisites:**
```bash
# Install Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Login to Azure
az login

# Set subscription
az account set --subscription "your-subscription-id"
```

#### **1. Create Resource Group**
```bash
az group create \
  --name "rg-todoapp-prod" \
  --location "East US"
```

#### **2. Create App Service Plan**
```bash
az appservice plan create \
  --name "plan-todoapp-prod" \
  --resource-group "rg-todoapp-prod" \
  --sku "B1" \
  --is-linux
```

#### **3. Create Web App**
```bash
az webapp create \
  --name "todoapp-backend-prod" \
  --resource-group "rg-todoapp-prod" \
  --plan "plan-todoapp-prod" \
  --runtime "DOTNETCORE:9.0"
```

#### **4. Deploy Backend**
```bash
# Build and publish
cd backend/TodoApi
dotnet publish -c Release -o ./publish

# Create deployment package
cd publish
zip -r ../deploy.zip .

# Deploy to Azure
az webapp deployment source config-zip \
  --resource-group "rg-todoapp-prod" \
  --name "todoapp-backend-prod" \
  --src ../deploy.zip
```

#### **5. Create Static Web App (Frontend)**
```bash
az staticwebapp create \
  --name "todoapp-frontend-prod" \
  --resource-group "rg-todoapp-prod" \
  --source "https://github.com/your-username/todo-list-app" \
  --branch "main" \
  --app-location "/frontend/angular-app" \
  --output-location "dist/todo-list-angular"
```

### 🏗️ Terraform Infrastructure as Code

**Perfect for**: Enterprise deployments, reproducible infrastructure
**Time**: ~45 minutes
**Requirements**: Terraform, Azure CLI

#### **1. Setup Terraform**
```bash
# Install Terraform
wget https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_linux_amd64.zip
unzip terraform_1.6.0_linux_amd64.zip
sudo mv terraform /usr/local/bin/

# Verify installation
terraform version
```

#### **2. Configure Variables**
```bash
cd terraform

# Create terraform.tfvars
cat > terraform.tfvars << EOF
resource_group_name = "rg-todoapp-terraform"
location = "East US"
app_service_plan_name = "plan-todoapp-terraform"
backend_app_name = "todoapp-backend-terraform"
frontend_app_name = "todoapp-frontend-terraform"
sql_server_name = "sql-todoapp-terraform"
sql_database_name = "TodoDb"
sql_admin_username = "todoapp_admin"
sql_admin_password = "YourStrong@Password123"
EOF
```

#### **3. Deploy Infrastructure**
```bash
# Initialize Terraform
terraform init

# Plan deployment
terraform plan

# Apply infrastructure
terraform apply

# Note the outputs
terraform output
```

#### **4. Deploy Applications**
```bash
# Get App Service details from Terraform output
BACKEND_APP_NAME=$(terraform output -raw backend_app_name)
RESOURCE_GROUP=$(terraform output -raw resource_group_name)

# Deploy backend
cd ../backend/TodoApi
dotnet publish -c Release -o ./publish
cd publish
zip -r ../deploy.zip .

az webapp deployment source config-zip \
  --resource-group "$RESOURCE_GROUP" \
  --name "$BACKEND_APP_NAME" \
  --src ../deploy.zip

# Deploy frontend (via GitHub Actions or manual upload)
```

## 🐳 Container Deployment

### 🚀 Docker Production Build

**Perfect for**: Container orchestration, Kubernetes, cloud containers
**Time**: ~20 minutes
**Requirements**: Docker, container registry

#### **1. Build Production Images**
```bash
# Build backend image
docker build -t todoapp-backend:latest -f backend/TodoApi/Dockerfile .

# Build frontend image
docker build -t todoapp-frontend:latest -f frontend/angular-app/Dockerfile .

# Tag for registry
docker tag todoapp-backend:latest your-registry.azurecr.io/todoapp-backend:latest
docker tag todoapp-frontend:latest your-registry.azurecr.io/todoapp-frontend:latest
```

#### **2. Push to Registry**
```bash
# Login to Azure Container Registry
az acr login --name your-registry

# Push images
docker push your-registry.azurecr.io/todoapp-backend:latest
docker push your-registry.azurecr.io/todoapp-frontend:latest
```

#### **3. Deploy with Docker Compose (Production)**
```bash
# Use production compose file
docker-compose -f docker-compose.prod.yml up -d

# With monitoring
docker-compose -f docker-compose.yml -f docker-compose.monitoring.yml up -d
```

## 🔧 Environment Configuration

### 🌍 Environment Variables

#### **Backend (.NET)**
```bash
# Development
ASPNETCORE_ENVIRONMENT=Development

# Production
ASPNETCORE_ENVIRONMENT=Production
ConnectionStrings__TodoContext="your-production-connection-string"
AllowedOrigins__0="https://your-frontend-domain.com"
```

#### **Frontend (Angular)**
```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-api.azurewebsites.net'
};
```

### 🔒 Security Configuration

#### **HTTPS Setup**
```bash
# Azure App Service (automatic)
az webapp update \
  --resource-group "rg-todoapp-prod" \
  --name "todoapp-backend-prod" \
  --https-only true
```

#### **CORS Configuration**
```csharp
// Program.cs
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("https://your-frontend-domain.com")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
```

## 📊 Monitoring & Maintenance

### 🔍 Health Checks
```bash
# Backend health
curl https://your-backend.azurewebsites.net/health

# Frontend availability
curl https://your-frontend.azurestaticapps.net

# Database connectivity (if using external DB)
curl https://your-backend.azurewebsites.net/api/todos
```

### 📈 Application Insights (Azure)
```bash
# Enable Application Insights
az monitor app-insights component create \
  --app "todoapp-insights" \
  --location "East US" \
  --resource-group "rg-todoapp-prod"

# Get instrumentation key
az monitor app-insights component show \
  --app "todoapp-insights" \
  --resource-group "rg-todoapp-prod" \
  --query "instrumentationKey"
```

### 🔄 Backup & Recovery
```bash
# Database backup (if using Azure SQL)
az sql db export \
  --resource-group "rg-todoapp-prod" \
  --server "sql-todoapp-prod" \
  --name "TodoDb" \
  --storage-key-type "StorageAccessKey" \
  --storage-key "your-storage-key" \
  --storage-uri "https://yourstorage.blob.core.windows.net/backups/todoapp-backup.bacpac"
```

## 🆘 Troubleshooting

### Common Issues

#### **1. Port Conflicts**
```bash
# Check port usage
lsof -i :4200  # Frontend
lsof -i :5001  # Backend

# Kill processes
kill -9 $(lsof -t -i:4200)
```

#### **2. Database Connection Issues**
```bash
# Test connection string
dotnet run --urls="http://localhost:5001" --environment="Production"

# Check logs
az webapp log tail --resource-group "rg-todoapp-prod" --name "todoapp-backend-prod"
```

#### **3. CORS Issues**
```bash
# Check browser console for CORS errors
# Verify AllowedOrigins configuration
# Ensure HTTPS is properly configured
```

#### **4. Build Failures**
```bash
# Clear npm cache
npm cache clean --force

# Clear .NET cache
dotnet clean
dotnet restore

# Rebuild
npm run build
dotnet build
```

### Getting Help

- 📚 **Documentation**: Comprehensive deployment guides
- 🐛 **Issues**: GitHub Issues for deployment problems
- 💬 **Discussions**: Community support for deployment questions
- 🔍 **Logs**: Check application logs for detailed error information

---
**🚀 Multiple deployment options for every use case**
*From local development to enterprise-scale production deployments*# 🛠️ Development Guide

Comprehensive guide for developers contributing to the Todo List Application, covering the tech stack, architecture, and development workflows.

## 🏗️ Tech Stack Overview

### Frontend (Angular 20+)
- **Angular 20.1.6** with **Standalone Components** - Latest modern architecture
- **TypeScript 5.8.3** - Full type safety with strict mode
- **RxJS** - Reactive programming for HTTP operations
- **Angular CLI** - Latest development tools and build optimization
- **ESLint** - Code quality with Angular-specific rules

### Backend (.NET 9)
- **.NET 9.0** - Latest cross-platform framework
- **ASP.NET Core Web API** - High-performance web framework
- **Entity Framework Core** - Modern ORM with in-memory provider
- **Health Checks** - Built-in monitoring endpoints
- **Swagger/OpenAPI** - Interactive API documentation

### Database Options
- **In-Memory Database** - Default for development (zero setup)
- **PostgreSQL** - Production-ready with Docker support
- **SQL Server** - Enterprise option with Docker profile

### DevOps & Quality
- **GitHub Actions** - 4 CI/CD workflows (optimized for performance)
- **Docker & Docker Compose** - Multi-environment containerization
- **Trivy Security Scanning** - Vulnerability detection
- **ESLint Code Quality** - Angular-specific linting and standards
- **Terraform** - Infrastructure as Code for Azure deployment

## 📁 Project Structure

```
todo-list-app/
├── 🎨 frontend/angular-app/           # Angular standalone components
│   ├── src/app/                      # Application source
│   ├── src/environments/             # Environment configs
│   └── dist/                         # Build output
├── 🔧 backend/TodoApi/               # .NET Core Web API
│   ├── Controllers/                  # API endpoints
│   ├── Models/                       # Data models
│   └── Data/                         # Database context
├── 🧪 backend/TodoApi.Tests/         # Backend unit tests
├── 🔄 .github/workflows/             # CI/CD pipelines (4 workflows)
├── 🐳 docker-compose.yml             # Multi-database setup
├── 🏗️ terraform/                     # Azure infrastructure
├── 📊 database/                      # Database scripts & docs
└── 📚 docs/                          # Comprehensive documentation
```

## 🚀 Development Setup

### Prerequisites
- **Node.js 18+** and npm
- **.NET 9 SDK**
- **Git**
- **VS Code** (recommended) or JetBrains Rider

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-list-app
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend/angular-app
   npm install
   ```

3. **Restore backend dependencies**
   ```bash
   cd ../..
   cd backend/TodoApi
   dotnet restore
   ```

4. **Run development servers**
   ```bash
   # Terminal 1: Backend
   cd backend/TodoApi
   ASPNETCORE_ENVIRONMENT=Development dotnet run --urls="http://localhost:5001"
   
   # Terminal 2: Frontend
   cd frontend/angular-app
   npm start
   ```

## 💻 Frontend Development

### Angular Architecture

The frontend uses Angular's latest standalone components architecture:

```typescript
// Example component structure
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  // Component logic here
}
```

### Code Structure
- **Components**: Individual UI elements (todo-item, todo-list)
- **Services**: Data management (todo.service.ts)
- **Models**: Data structures (todo.ts)
- **Styles**: CSS files for component styling

### Development Commands

```bash
# Start development server
npm start

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Build for production
npm run build
```

## 🔧 Backend Development

### .NET Architecture

The backend follows clean architecture principles:

```
TodoApi/
├── Controllers/          # API endpoints
├── Models/               # Data models
├── Data/                 # Database context
├── Services/             # Business logic
└── Program.cs            # Application entry point
```

### Development Commands

```bash
# Run development server
dotnet run

# Run tests
cd ../TodoApi.Tests
dotnet test

# Run tests with coverage
dotnet test --collect:"XPlat Code Coverage"

# Build project
dotnet build
```

## 🧪 Testing

### Frontend Testing

```bash
cd frontend/angular-app

# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- --include="src/app/todo.service.spec.ts"
```

### Backend Testing

```bash
cd backend/TodoApi.Tests

# Run all tests
dotnet test

# Run specific test class
dotnet test --filter "TodoControllerTests"

# Run with detailed output
dotnet test --verbosity normal
```

### Quality Checks

```bash
# Frontend linting
cd frontend/angular-app
npm run lint

# Backend formatting
cd backend/TodoApi
dotnet format --verify-no-changes
```

## 🔄 Git Workflow

### Branching Strategy
- **main** - Production-ready code
- **develop** - Development branch
- **feature/** - Feature branches
- **hotfix/** - Hotfix branches
- **release/** - Release branches

### Commit Guidelines
Follow conventional commits:
```
feat: Add new deadline feature
fix: Resolve todo completion bug
docs: Update README with new instructions
test: Add tests for todo service
refactor: Improve component structure
```

### Pull Request Process
1. Fork the repository
2. Create feature branch
3. Make changes following coding standards
4. Add tests for new functionality
5. Run quality checks
6. Submit pull request

## ✅ Code Quality Standards

### Frontend Standards
- **ESLint compliance** required (0 errors)
- **TypeScript strict mode** compliance
- **No `any` types** - Full type safety
- **Standalone components** - No NgModules
- **Inject function** - Modern dependency injection

### Backend Standards
- **Clean architecture** - Separation of concerns
- **Entity Framework Core** - Modern ORM patterns
- **Health checks** - Production monitoring
- **OpenAPI documentation** - Self-documenting API

## 🐳 Docker Development

### Development with Docker
```bash
# Start with PostgreSQL
docker-compose up

# Start with SQL Server
docker-compose --profile sqlserver up

# View services
docker-compose ps
```

### Debugging with Docker
```bash
# View logs
docker-compose logs

# Execute commands in container
docker-compose exec backend bash
```

## 🆘 Troubleshooting

### Common Development Issues

1. **Port conflicts**
   ```bash
   # Check ports
   lsof -i :4200  # Frontend
   lsof -i :5001  # Backend
   
   # Kill processes
   kill -9 $(lsof -t -i:4200)
   ```

2. **Dependency issues**
   ```bash
   # Frontend
   cd frontend/angular-app
   rm -rf node_modules package-lock.json
   npm install
   
   # Backend
   cd backend/TodoApi
   dotnet clean
   dotnet restore
   ```

3. **Database connection errors**
   - Verify backend is running
   - Check connection strings in appsettings.json
   - Ensure Docker containers are running (if using Docker)

### Getting Help

- 📚 **Documentation**: Comprehensive guides in wiki
- 🐛 **Issues**: GitHub Issues for development problems
- 💬 **Discussions**: GitHub Discussions for questions

---
**🎉 Happy coding! You're ready to contribute to the Todo List Application.**# ⚙️ Environment Configuration

Comprehensive guide to configuring the Todo List Application for different environments (Development, Testing, Production).

## 🌍 Environment Files

The application uses environment-specific configuration files:

### Frontend (Angular)

#### Development Environment
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5001'
};
```

#### Production Environment
```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-api.azurewebsites.net'
};
```

### Backend (.NET)

#### Development Configuration
```json
// appsettings.Development.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedOrigins": [
    "http://localhost:4200"
  ]
}
```

#### Production Configuration
```json
// appsettings.Production.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedOrigins": [
    "https://your-frontend-domain.com"
  ],
  "ConnectionStrings": {
    "TodoContext": "your-production-connection-string"
  }
}
```

## 📁 Environment Variables

### Backend (.NET Core)

#### Core Settings
```bash
# Environment
ASPNETCORE_ENVIRONMENT=Development|Production

# URLs
ASPNETCORE_URLS=http://localhost:5001

# Connection Strings
ConnectionStrings__TodoContext=your-connection-string

# CORS Origins
AllowedOrigins__0=http://localhost:4200
AllowedOrigins__1=https://your-frontend-domain.com
```

#### Logging Configuration
```bash
# Logging Level
Logging__LogLevel__Default=Information
Logging__LogLevel__Microsoft.AspNetCore=Warning
```

### Frontend (Angular)

#### Build Configuration
```bash
# Production API URL
API_URL=https://your-backend-api.azurewebsites.net

# Feature Flags
FEATURE_DEADLINES=true
FEATURE_PRIORITY_SORTING=true
```

## 🐳 Docker Environment

### Docker Compose Variables

#### PostgreSQL Configuration
```yaml
# docker-compose.yml
environment:
  - ASPNETCORE_ENVIRONMENT=Development
  - ConnectionStrings__TodoContext=Host=database;Port=5432;Database=TodoDb;Username=postgres;Password=postgres
  - AllowedOrigins__0=http://localhost:4200
```

#### SQL Server Configuration
```yaml
# docker-compose.yml with SQL Server profile
environment:
  - ASPNETCORE_ENVIRONMENT=Development
  - ConnectionStrings__TodoContext=Server=sqlserver;Database=TodoDb;User Id=sa;Password=YourStrong@Passw0rd;TrustServerCertificate=true;
  - AllowedOrigins__0=http://localhost:4200
```

## ☁️ Cloud Provider Configuration

### Azure App Service

#### Application Settings
```bash
# In Azure Portal → App Service → Configuration → Application Settings
ASPNETCORE_ENVIRONMENT=Production
ConnectionStrings:TodoContext=your-azure-sql-connection-string
AllowedOrigins:0=https://your-frontend.azurestaticapps.net
```

#### Connection Strings
```bash
# In Azure Portal → App Service → Configuration → Connection Strings
Name: TodoContext
Value: your-azure-sql-connection-string
Type: SQLServer
```

### Terraform Variables

#### terraform.tfvars
```hcl
# Resource Configuration
resource_group_name = "rg-todoapp-prod"
location = "East US"

# App Service Configuration
app_service_plan_name = "plan-todoapp-prod"
backend_app_name = "todoapp-backend-prod"
frontend_app_name = "todoapp-frontend-prod"

# Database Configuration
sql_server_name = "sql-todoapp-prod"
sql_database_name = "TodoDb"
sql_admin_username = "todoapp_admin"
sql_admin_password = "YourStrong@Password123"
```

## 🔧 Configuration by Environment

### Development Environment

#### Characteristics
- In-memory database (no setup required)
- Detailed logging
- Hot reload enabled
- CORS enabled for localhost

#### Configuration Files
```json
// appsettings.Development.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedOrigins": [
    "http://localhost:4200"
  ]
}
```

### Testing Environment

#### Characteristics
- In-memory database
- Test-specific logging
- Disabled authentication
- Mock external services

#### Environment Variables
```bash
ASPNETCORE_ENVIRONMENT=Testing
ConnectionStrings__TodoContext=InMemory
```

### Production Environment

#### Characteristics
- Persistent database (PostgreSQL/SQL Server)
- Minimal logging
- HTTPS enforced
- Strict CORS policy

#### Configuration Files
```json
// appsettings.Production.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedOrigins": [
    "https://your-production-frontend.com"
  ],
  "ConnectionStrings": {
    "TodoContext": "your-production-connection-string"
  }
}
```

## 🔒 Security Configuration

### HTTPS Enforcement
```csharp
// Program.cs
if (app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
}
```

### CORS Policy
```csharp
// Program.cs
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(builder.Configuration.GetSection("AllowedOrigins").Get<string[]>())
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
```

### Authentication (Future Implementation)
```csharp
// Program.cs
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "your-issuer",
            ValidAudience = "your-audience",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding# ❓ Frequently Asked Questions

Answers to common questions about the Todo List Application.

## 🚀 General Questions

### What technologies does this application use?
The application uses a modern tech stack:
- **Frontend**: Angular 20+ with standalone components, TypeScript, RxJS
- **Backend**: .NET 9 with ASP.NET Core Web API
- **Database**: Entity Framework Core with PostgreSQL/SQL Server support
- **DevOps**: GitHub Actions, Docker, Terraform

### How do I report a bug?
1. Check the [Issues](https://github.com/your-username/todo-list-app/issues) to see if it's already reported
2. If not, create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment information (OS, browser, etc.)

### How do I request a feature?
1. Check the [Issues](https://github.com/your-username/todo-list-app/issues) to see if it's already requested
2. If not, create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Any implementation ideas (optional)

## 🛠️ Development Questions

### How do I set up the development environment?
Follow the [Installation Guide](Installation) which covers:
- Prerequisites (Node.js, .NET SDK, Git)
- Platform-specific installation instructions
- Environment configuration
- Verification steps

### How do I run tests?
For frontend tests:
```bash
cd frontend/angular-app
npm test
```

For backend tests:
```bash
cd backend/TodoApi.Tests
dotnet test
```

See the [Testing Guide](Testing) for comprehensive testing information.

### How do I contribute code?
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run quality checks
6. Submit a pull request

See the [Contributing Guide](Contributing) for detailed contribution guidelines.

## 🐳 Docker Questions

### How do I use Docker for development?
```bash
# Start with PostgreSQL
docker-compose up

# Start with SQL Server
docker-compose --profile sqlserver up
```

See the [Docker Usage Guide](Docker-Usage) for detailed Docker instructions.

### How do I access the database in Docker?
For PostgreSQL:
- Host: localhost
- Port: 5432
- Database: TodoDb
- Username: postgres
- Password: postgres

For SQL Server:
- Host: localhost
- Port: 1433
- Database: TodoDb
- Username: sa
- Password: YourStrong@Passw0rd

## ☁️ Deployment Questions

### How do I deploy to Azure?
The application supports multiple deployment options:
1. **GitHub Actions** (recommended)
2. **Manual Azure CLI deployment**
3. **Terraform Infrastructure as Code**

See the [Deployment Guide](Deployment) for detailed deployment instructions.

### How do I configure custom domains?
For Azure App Service:
1. In Azure Portal, go to your App Service
2. Navigate to Custom domains
3. Add your custom domain
4. Configure DNS records as instructed
5. Update `AllowedOrigins` in appsettings

### How do I enable HTTPS?
Azure App Service automatically provides HTTPS for *.azurewebsites.net domains. For custom domains:
1. Add a custom domain
2. Azure automatically provisions an SSL certificate
3. Enforce HTTPS in application settings

## 🔧 Technical Questions

### How does the deadline feature work?
The deadline feature provides:
- Optional datetime picker for setting deadlines
- Real-time countdown timers with smart formatting
- Automatic priority sorting based on urgency
- Visual indicators for different priority levels
- Overdue detection and highlighting

### How is data persisted?
Data persistence options:
- **Development**: In-memory database (data lost on restart)
- **Production**: PostgreSQL or SQL Server database
- **Frontend**: LocalStorage for client-side caching

### How does the priority system work?
Priority is automatically calculated based on deadlines:
- **🔴 Urgent**: Due within 2 hours
- **🟠 High**: Due within 24 hours
- **🔵 Medium**: Due within 7 days
- **🟢 Low**: Due in more than 7 days
- **No deadline**: Appears last in sorting

## 🧪 Testing Questions

### How do I run integration tests?
```bash
# Start backend
cd backend/TodoApi
ASPNETCORE_ENVIRONMENT=Development dotnet run

# Run frontend tests that interact with backend
cd frontend/angular-app
npm test
```

### What testing frameworks are used?
- **Frontend**: Jasmine and Karma
- **Backend**: MSTest with Moq for mocking
- **CI/CD**: GitHub Actions for automated testing

## 🔒 Security Questions

### How is security handled?
Security measures include:
- **Input validation** to prevent injection attacks
- **CORS configuration** to control access
- **HTTPS enforcement** in production
- **Security scanning** with Trivy and Snyk
- **Dependency auditing** with npm audit

### How do I report a security vulnerability?
Please report security vulnerabilities responsibly:
1. Do NOT create public issues for security problems
2. Email the maintainers directly
3. Include detailed information about the vulnerability
4. Allow time for a fix before public disclosure

## 🆘 Support Questions

### Where can I get help?
1. **Documentation**: Check the wiki pages
2. **Issues**: Search existing issues or create a new one
3. **Discussions**: Use GitHub Discussions for questions
4. **Community**: Join our community chat (if available)

### What information should I include when asking for help?
When requesting help, include:
- Clear description of the problem
- Steps you've already tried
- Error messages or logs
- Environment information (OS, browser, versions)
- Screenshots if applicable

## 📱 Usage Questions

### How do I add a todo with a deadline?
1. Type your todo in the input field
2. Click the 📅 icon next to the input
3. Select date and time in the datetime picker
4. Press Enter or click Add

### How do I filter todos?
Use the filter buttons in the footer:
- **All**: Show all todos
- **Active**: Show only incomplete todos
- **Completed**: Show only completed todos

### How do I clear completed todos?
Click the "Clear completed" button in the footer to remove all completed todos at once.

## 🔄 CI/CD Questions

### How do I trigger CI/CD workflows?
- **Basic CI**: Automatically runs on push to main
- **Other workflows**: Manual trigger through GitHub Actions UI
- **Release**: Triggered by creating a new tag

### How do I view test results?
Test results are available in:
1. **GitHub Actions**: Check workflow run details
2. **Local development**: Terminal output from test commands
3. **Code coverage**: Generated reports in coverage directories

## 🎨 Customization Questions

### How do I customize the styling?
1. Modify CSS files in:
   - `frontend/angular-app/src/styles.css` (global styles)
   - Component-specific CSS files
2. Update color schemes in CSS variables
3. Modify component templates in HTML files

### How do I add new features?
1. Plan the feature and create an issue
2. Create a feature branch
3. Implement the feature following existing patterns
4. Add tests for the new functionality
5. Update documentation
6. Submit a pull request

## 📚 Documentation Questions

### How do I update the wiki?
The wiki is maintained in the repository:
1. Clone the repository
2. Edit files in the `wiki/` directory
3. Submit a pull request with changes

### Where is the API documentation?
API documentation is available:
1. **Swagger UI**: http://localhost:5001/swagger (when running)
2. **API Documentation**: [API Documentation](API-Documentation) wiki page
3. **Inline code comments**: In controller and model files

---
**Didn't find your question?** Check the relevant documentation sections or create an issue to ask!# Todo List Application Wiki

Welcome to the Todo List Application wiki! This comprehensive full-stack application features a modern Angular frontend and a robust .NET Core backend with enterprise-grade capabilities.

## 🌟 Key Features

### 📋 Core Functionality
- Add, edit, and delete todos with real-time updates
- Mark todos as complete/incomplete with visual feedback
- Optional deadline management with datetime picker
- Real-time countdown timers with smart formatting (2d 5h, 3h 45m, 15m)
- Priority-based sorting with automatic urgency calculation
- Visual priority indicators (Red/Orange/Blue/Green color coding)
- Todo counter showing remaining items
- Responsive design works on all devices
- Error handling with user-friendly messages

### ⚙️ Technical Excellence
- **100% ESLint Compliant** - Zero linting errors with modern Angular patterns
- **Standalone Components** - Latest Angular architecture for better performance
- **Type-Safe** - Full TypeScript coverage with no `any` types
- **100% Test Coverage** - All tests passing with comprehensive coverage
- **Robust CI/CD** - 4 GitHub Actions workflows with artifact management
- **Multi-Database Support** - PostgreSQL (default) and SQL Server options
- **Security Scanning** - Trivy vulnerability scanning and npm audit

## 📚 Wiki Sections

Navigate through our documentation to learn more about the application:

### 🚀 Getting Started
- [Quick Start Guide](Quick-Start-Guide)
- [Installation](Installation)
- [Usage](Usage)

### 🛠️ Development
- [Development Setup](Development)
- [Project Structure](Project-Structure)
- [Frontend Architecture](Frontend-Architecture)
- [Backend Architecture](Backend-Architecture)

### ☁️ Deployment
- [Deployment Options](Deployment)
- [Docker Usage](Docker-Usage)
- [Azure Deployment](Azure-Deployment)

### 🧪 Testing & Quality
- [Testing Guide](Testing)
- [CI/CD Documentation](CI-CD)
- [Code Quality](Code-Quality)

### 🔧 API & Technical
- [API Documentation](API-Documentation)
- [Database Schema](Database-Schema)
- [Environment Configuration](Environment-Configuration)

### 🆘 Support
- [Troubleshooting](Troubleshooting)
- [FAQ](FAQ)
- [Contributing](Contributing)

## 🎯 Quick Links

- **Frontend**: http://localhost:4200
- **API**: http://localhost:5001/api/todos
- **Swagger**: http://localhost:5001/swagger
- **Repository**: [GitHub Repository](https://github.com/your-username/todo-list-app)

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---
**🎉 Built with modern web technologies and enterprise-grade practices**
*Ready for production deployment with zero technical debt*# 🛠️ Installation Guide

Detailed installation instructions for the Todo List Application, covering all supported platforms and configurations.

## 📋 Prerequisites

Before installing the application, ensure you have the following prerequisites:

### Core Requirements
- **Node.js 18+** and npm
- **.NET 9 SDK**
- **Git** (for cloning the repository)
- **Modern Web Browser** (Chrome, Firefox, Safari, Edge)

### Optional Requirements
- **Docker** (for containerized deployment)
- **Docker Compose** (for multi-service deployment)
- **Azure CLI** (for Azure deployment)
- **Terraform** (for Infrastructure as Code deployment)

## 🖥️ Platform-Specific Installation

### Windows

1. **Install Node.js and npm**
   - Download from https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **Install .NET 9 SDK**
   - Download from https://dotnet.microsoft.com/download/dotnet/9
   - Verify installation: `dotnet --version`

3. **Install Git**
   - Download from https://git-scm.com/
   - Verify installation: `git --version`

### macOS

1. **Install Node.js and npm**
   ```bash
   # Using Homebrew (recommended)
   brew install node
   
   # Or download from https://nodejs.org/
   ```

2. **Install .NET 9 SDK**
   ```bash
   # Using Homebrew
   brew install dotnet
   
   # Or download from https://dotnet.microsoft.com/download/dotnet/9
   ```

3. **Install Git**
   ```bash
   # Using Homebrew
   brew install git
   
   # Or download from https://git-scm.com/
   ```

### Linux (Ubuntu/Debian)

1. **Install Node.js and npm**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Install .NET 9 SDK**
   ```bash
   wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
   sudo dpkg -i packages-microsoft-prod.deb
   sudo apt-get update
   sudo apt-get install -y dotnet-sdk-9.0
   ```

3. **Install Git**
   ```bash
   sudo apt-get update
   sudo apt-get install git
   ```

## 🚀 Application Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd todo-list-app
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend/TodoApi
```

Restore .NET dependencies:
```bash
dotnet restore
```

### 3. Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend/angular-app
```

Install npm dependencies:
```bash
npm install
```

## 🐳 Docker Installation

For containerized deployment, Docker installation is required.

### Windows/macOS
1. Download Docker Desktop from https://www.docker.com/products/docker-desktop
2. Follow the installation wizard
3. Start Docker Desktop

### Linux
```bash
# Update package index
sudo apt-get update

# Install Docker
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## ☁️ Cloud Provider Setup

### Azure CLI Installation

#### Windows
```bash
# Download from https://aka.ms/installazurecliwindows
# Or using PowerShell
Invoke-WebRequest -Uri https://aka.ms/installazurecliwindows -OutFile .\AzureCLI.msi
Start-Process msiexec.exe -Wait -ArgumentList '/I AzureCLI.msi'
```

#### macOS
```bash
brew install azure-cli
```

#### Linux
```bash
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

### Terraform Installation

#### Windows
```bash
# Using Chocolatey
choco install terraform

# Or download from https://www.terraform.io/downloads.html
```

#### macOS
```bash
brew install terraform
```

#### Linux
```bash
wget https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_linux_amd64.zip
unzip terraform_1.6.0_linux_amd64.zip
sudo mv terraform /usr/local/bin/
```

## 🔧 Environment Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```bash
# Backend (.NET)
ASPNETCORE_ENVIRONMENT=Development
ConnectionStrings__TodoContext="your-connection-string"

# Frontend (Angular)
API_URL=http://localhost:5001
```

### Database Configuration

#### In-Memory Database (Development Default)
No configuration required - works out of the box.

#### PostgreSQL
```bash
# Connection string format
Host=localhost;Port=5432;Database=TodoDb;Username=your-user;Password=your-password
```

#### SQL Server
```bash
# Connection string format
Server=localhost;Database=TodoDb;User Id=your-user;Password=your-password;TrustServerCertificate=true;
```

## ✅ Verification

After installation, verify all components are correctly installed:

### Check Versions
```bash
node --version
npm --version
dotnet --version
git --version
docker --version
docker-compose --version
```

### Run Tests
```bash
# Backend tests
cd backend/TodoApi.Tests
dotnet test

# Frontend tests
cd frontend/angular-app
npm test
```

## 🆘 Troubleshooting

### Common Installation Issues

1. **Permission errors with npm**
   ```bash
   # Fix npm permissions
   sudo chown -R $(whoami) ~/.npm
   ```

2. **.NET SDK not found**
   ```bash
   # Add to PATH
   export PATH="$PATH:/usr/local/share/dotnet"
   ```

3. **Docker permission denied**
   ```bash
   # Add user to docker group
   sudo usermod -aG docker $USER
   ```

4. **Node.js version conflicts**
   ```bash
   # Use nvm to manage versions
   nvm install 18
   nvm use 18
   ```

### Getting Help

- 📚 **Documentation**: Comprehensive guides in wiki
- 🐛 **Issues**: GitHub Issues for installation problems
- 💬 **Discussions**: GitHub Discussions for questions

---
**🎉 Installation complete! You're ready to start developing.**# 🏃‍♂️ Quick Start Guide

Get up and running with the Todo List Application in just a few minutes!

## 🚀 Fastest Start (In-Memory Database)

Perfect for development, testing, and demos with zero setup required.

### Prerequisites
- **Node.js 18+** and npm
- **.NET 9 SDK**

### Steps

1. **Clone and start backend**
   ```bash
   git clone <repository-url>
   cd todo-list-app/backend/TodoApi
   ASPNETCORE_ENVIRONMENT=Development dotnet run --urls="http://localhost:5001"
   ```

2. **Start frontend** (new terminal)
   ```bash
   cd frontend/angular-app
   npm install
   npm start
   ```

3. **Open application**
   - 🎨 **Frontend**: http://localhost:4200
   - 🔧 **API**: http://localhost:5001/api/todos
   - 📚 **Swagger**: http://localhost:5001/swagger

## 🐳 Docker Development

For a production-like environment with container isolation.

### PostgreSQL (Recommended - Faster, Lighter)
```bash
# Start with PostgreSQL (recommended)
docker-compose up
```

### SQL Server (Enterprise Option)
```bash
# Start with SQL Server
docker-compose --profile sqlserver up
```

### View Services
```bash
# Check running services
docker-compose ps
```

## ✨ Features Available

### Core Functionality
- ✅ **Add, edit, and delete todos** with real-time updates
- ✅ **Mark todos as complete/incomplete** with visual feedback
- ✅ **Optional deadline management** with datetime picker
- ✅ **Real-time countdown timers** with smart formatting (2d 5h, 3h 45m, 15m)
- ✅ **Priority-based sorting** with automatic urgency calculation
- ✅ **Visual priority indicators** (Red/Orange/Blue/Green color coding)
- ✅ **Todo counter** showing remaining items
- ✅ **Responsive design** works on all devices
- ✅ **Error handling** with user-friendly messages

### Technical Features
- ✅ **RESTful API** with OpenAPI/Swagger documentation
- ✅ **In-memory database** for development (no setup required)
- ✅ **Docker support** with multi-database options
- ✅ **Health checks** for monitoring and reliability
- ✅ **CORS enabled** for cross-origin requests
- ✅ **Modern injection patterns** using Angular's inject() function

## 🔧 Accessing the Application

After starting the application:

1. **Frontend**: Open http://localhost:4200 in your browser
2. **API**: Access REST endpoints at http://localhost:5001/api/todos
3. **Swagger**: View API documentation at http://localhost:5001/swagger

## 🆘 Troubleshooting

### Common Issues
1. **Port conflicts**: Check if ports 4200/5001 are available
2. **Database issues**: Use in-memory database for development
3. **Build errors**: Check Node.js and .NET versions

### Need Help?
- 📚 **Documentation**: Comprehensive guides in wiki
- 🐛 **Issues**: GitHub Issues for bug reports
- 💬 **Discussions**: GitHub Discussions for questions

---
**🎉 You're ready to start using the Todo List Application!**# GitHub Wiki Setup

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

The wiki will be automatically updated on GitHub after pushing.# 🧪 Testing Guide

Comprehensive testing guide for the full-stack Todo List application, covering frontend, backend, integration, and end-to-end testing strategies.

## ✨ Testing Overview

### 🎯 Quality Metrics Achieved
- ✅ **Frontend Tests**: 10/10 passing (100% success rate)
- ✅ **ESLint Compliance**: 0 errors (100% code quality)
- ✅ **TypeScript Safety**: No `any` types (100% type coverage)
- ✅ **Backend Tests**: Comprehensive unit test coverage
- ✅ **Integration Tests**: API endpoints with in-memory database
- ✅ **CI/CD Testing**: 4 automated workflows

### 🏗️ Testing Architecture
- **Unit Tests** - Individual component/service testing
- **Integration Tests** - API endpoint testing
- **E2E Tests** - Full application workflow testing
- **Security Tests** - Vulnerability scanning
- **Performance Tests** - Load and stress testing

## 🎨 Frontend Testing

### 🚀 Quick Start
```bash
cd frontend/angular-app

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run linting (0 errors guaranteed)
npm run lint

# Build verification
npm run build
```

### 🧪 Test Categories

#### **1. Component Tests**
- **TodoListComponent** - Main container component
- **TodoItemComponent** - Individual todo item
- **AppComponent** - Root application component

#### **2. Service Tests**
- **TodoService** - HTTP client service with proper typing
- **Error handling** - HttpErrorResponse with type guards
- **API communication** - Mock HTTP testing

#### **3. Integration Tests**
- **Component-Service** integration
- **HTTP interceptor** testing
- **Error boundary** testing

### 📊 Test Structure
```typescript
// Example: TodoService Test
describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });
  });

  it('should fetch todos', () => {
    const mockTodos: Todo[] = [
      { id: 1, title: 'Test Todo', isCompleted: false }
    ];

    service.getTodos().subscribe(todos => {
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todos`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });
});
```

## 🔧 Backend Testing

### 🚀 Quick Start
```bash
cd backend/TodoApi.Tests

# Run all tests
dotnet test

# Run with coverage
dotnet test --collect:"XPlat Code Coverage"

# Run specific test class
dotnet test --filter "TodoControllerTests"

# Run with detailed output
dotnet test --verbosity normal
```

### 🧪 Test Categories

#### **1. Controller Tests**
- **TodosController** - API endpoint testing
- **HTTP status codes** - Proper response codes
- **Request validation** - Input validation testing
- **Error handling** - Exception handling

#### **2. Service Tests**
- **Business logic** - Core functionality
- **Data validation** - Input sanitization
- **Error scenarios** - Edge case handling

#### **3. Repository Tests**
- **Entity Framework** - Database operations
- **CRUD operations** - Create, Read, Update, Delete
- **Query optimization** - Performance testing

### 📊 Test Structure
```csharp
// Example: TodosController Test
[TestClass]
public class TodosControllerTests
{
    private TodosController _controller;
    private Mock<ITodoService> _mockService;

    [TestInitialize]
    public void Setup()
    {
        _mockService = new Mock<ITodoService>();
        _controller = new TodosController(_mockService.Object);
    }

    [TestMethod]
    public async Task GetTodos_ReturnsOkResult()
    {
        // Arrange
        var todos = new List<Todo>
        {
            new Todo { Id = 1, Title = "Test", IsCompleted = false }
        };
        _mockService.Setup(s => s.GetTodosAsync()).ReturnsAsync(todos);

        // Act
        var result = await _controller.GetTodos();

        // Assert
        Assert.IsInstanceOfType(result, typeof(OkObjectResult));
    }
}
```

## 🔗 Integration Testing

### 🚀 API Integration Tests
```bash
# Start backend with in-memory database
cd backend/TodoApi
ASPNETCORE_ENVIRONMENT=Development dotnet run --urls="http://localhost:5001"

# Test API endpoints
curl -X GET http://localhost:5001/api/todos
curl -X POST http://localhost:5001/api/todos -H "Content-Type: application/json" -d '{"title":"Test Todo","isCompleted":false}'
```

### 🧪 Integration Test Scenarios

#### **1. API Health Checks**
- ✅ **Health endpoint** - `/health` returns "Healthy"
- ✅ **API availability** - All endpoints respond correctly
- ✅ **CORS configuration** - Cross-origin requests work
- ✅ **Error handling** - Proper error responses

#### **2. Database Integration**
- ✅ **In-memory database** - Development testing
- ✅ **Entity Framework** - ORM functionality
- ✅ **Data persistence** - CRUD operations
- ✅ **Transaction handling** - Data consistency

#### **3. Frontend-Backend Integration**
- ✅ **HTTP communication** - Service-to-API calls
- ✅ **Error propagation** - Error handling chain
- ✅ **Data transformation** - Model mapping
- ✅ **Real-time updates** - UI synchronization

## 🌐 End-to-End Testing

### 🚀 Manual E2E Testing

#### **1. Application Startup**
```bash
# Terminal 1: Start Backend
cd backend/TodoApi
ASPNETCORE_ENVIRONMENT=Development dotnet run --urls="http://localhost:5001"

# Terminal 2: Start Frontend
cd frontend/angular-app
npm start

# Browser: Open Application
open http://localhost:4200
```

#### **2. Core Functionality Tests**

**Adding Todos:**
1. ✅ Type "Buy groceries" in input field
2. ✅ Click "Add" button or press Enter
3. ✅ Verify todo appears in list
4. ✅ Verify input field clears
5. ✅ Verify todo counter updates
6. ✅ Try adding empty todo (should be prevented)

**Completing Todos:**
1. ✅ Click checkbox next to todo
2. ✅ Verify todo gets strikethrough styling
3. ✅ Verify todo counter decreases
4. ✅ Click checkbox again to uncheck
5. ✅ Verify styling returns to normal
6. ✅ Verify counter increases

**Deleting Todos:**
1. ✅ Click delete button on todo
2. ✅ Verify todo is removed from list
3. ✅ Verify todo counter updates
4. ✅ Verify API call is made (check Network tab)

#### **3. Error Handling Tests**

**Network Errors:**
1. ✅ Stop backend server
2. ✅ Try to add a todo
3. ✅ Verify error message appears
4. ✅ Verify application doesn't crash
5. ✅ Restart server and verify recovery

**Validation Errors:**
1. ✅ Try to submit empty todo
2. ✅ Verify validation prevents submission
3. ✅ Verify user-friendly error message

### 🤖 Automated E2E Testing

#### **Playwright Setup** (Future Enhancement)
```bash
cd frontend/angular-app
npm install @playwright/test
npx playwright install
```

#### **Example E2E Test**
```typescript
// e2e/todo-app.spec.ts
import { test, expect } from '@playwright/test';

test('should add and complete todo', async ({ page }) => {
  await page.goto('http://localhost:4200');

  // Add todo
  await page.fill('input[name="newTodoText"]', 'Test Todo');
  await page.click('button[type="submit"]');

  // Verify todo appears
  await expect(page.locator('text=Test Todo')).toBeVisible();

  // Complete todo
  await page.click('input[type="checkbox"]');

  // Verify completed styling
  await expect(page.locator('text=Test Todo')).toHaveClass(/completed/);
});
```

## 🛡️ Security Testing

### 🔍 Vulnerability Scanning
```bash
# Frontend security scan
cd frontend/angular-app
npm audit

# Backend security scan (via Trivy in CI/CD)
# Automatically runs in GitHub Actions

# Manual Trivy scan
trivy fs .
```

### 🧪 Security Test Scenarios

#### **1. Input Validation**
- ✅ **XSS Prevention** - Script injection attempts
- ✅ **SQL Injection** - Database query manipulation
- ✅ **Input Sanitization** - Malicious input handling
- ✅ **CORS Validation** - Cross-origin request testing

#### **2. Authentication & Authorization** (Future)
- ✅ **JWT Token Validation** - Token-based auth
- ✅ **Role-Based Access** - Permission testing
- ✅ **Session Management** - Session security
- ✅ **Password Security** - Encryption validation

## 📊 Performance Testing

### 🚀 Load Testing
```bash
# Install Artillery (load testing tool)
npm install -g artillery

# Create load test config
cat > load-test.yml << EOF
config:
  target: 'http://localhost:5001'
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: "Get todos"
    requests:
      - get:
          url: "/api/todos"
EOF

# Run load test
artillery run load-test.yml
```

### 📈 Performance Metrics
- ✅ **Response Time** - API response under 200ms
- ✅ **Throughput** - Handle 100+ concurrent users
- ✅ **Memory Usage** - Stable memory consumption
- ✅ **CPU Usage** - Efficient resource utilization

## 🔄 CI/CD Testing

### 🚀 GitHub Actions Testing
All tests run automatically in CI/CD:

#### **1. Basic CI Pipeline**
- ✅ **Frontend Tests** - npm test (10/10 passing)
- ✅ **Backend Tests** - dotnet test (all passing)
- ✅ **ESLint** - 0 errors (100% compliance)
- ✅ **Security Scan** - Trivy vulnerability scanning

#### **2. PR Validation Pipeline**
- ✅ **Multi-Platform** - Windows, macOS, Linux
- ✅ **Multi-Version** - .NET 9, Node.js 18/20
- ✅ **Integration Tests** - Full API testing
- ✅ **Performance Tests** - Load testing (when labeled)

### 📊 Quality Gates
- ✅ **ESLint**: Must pass with 0 errors
- ✅ **Unit Tests**: All tests must pass
- ✅ **Coverage**: Maintain coverage thresholds
- ✅ **Security**: No high/critical vulnerabilities
- ✅ **Build**: Successful compilation required

## 🎯 Testing Best Practices

### 📋 Test Organization
- ✅ **Arrange-Act-Assert** pattern
- ✅ **Descriptive test names** for clarity
- ✅ **Independent tests** (no dependencies)
- ✅ **Mock external dependencies**
- ✅ **Test edge cases** and error scenarios

### 🔧 Maintenance
- ✅ **Regular test updates** with code changes
- ✅ **Remove obsolete tests** during refactoring
- ✅ **Monitor test performance** and optimize
- ✅ **Review test coverage** regularly
- ✅ **Update test documentation**

## 🆘 Troubleshooting

### Common Issues
1. **Port conflicts**: Ensure ports 4200/5001 are available
2. **Test failures**: Check Node.js and .NET versions
3. **Network issues**: Verify backend is running for integration tests
4. **Browser issues**: Clear cache and cookies

### Getting Help
- 📚 **Documentation**: Comprehensive testing guides
- 🐛 **Issues**: GitHub Issues for test-related bugs
- 💬 **Discussions**: Community support for testing questions

---
**🧪 Comprehensive testing ensures production-ready quality**
*Zero defects, maximum confidence in deployments*# 🆘 Troubleshooting Guide

Comprehensive troubleshooting guide for common issues with the Todo List Application, organized by category with detailed solutions.

## 🚀 Startup Issues

### Application Won't Start

#### **Symptom**: Frontend fails to compile
**Error**: `Module not found` or `Cannot find module`

**Solution**:
```bash
# Clean and reinstall dependencies
cd frontend/angular-app
rm -rf node_modules package-lock.json
npm install
npm start
```

#### **Symptom**: Backend fails to start
**Error**: `Failed to load hosting runtime` or `No .NET SDK found`

**Solution**:
```bash
# Verify .NET installation
dotnet --version

# Restore dependencies
cd backend/TodoApi
dotnet restore
dotnet run
```

### Port Conflicts

#### **Symptom**: `EADDRINUSE` or `Port already in use`

**Solution**:
```bash
# Check port usage
lsof -i :4200  # Frontend
lsof -i :5001  # Backend

# Kill processes using ports
kill -9 $(lsof -t -i:4200)
kill -9 $(lsof -t -i:5001)

# Alternative: Use different ports
ASPNETCORE_URLS=http://localhost:5002 dotnet run
```

## 🌐 Connectivity Issues

### API Connection Failed

#### **Symptom**: Frontend shows "Failed to fetch todos" or network errors

**Solution**:
1. **Verify backend is running**:
   ```bash
   curl http://localhost:5001/api/todos
   ```

2. **Check CORS configuration** in `appsettings.Development.json`:
   ```json
   {
     "AllowedOrigins": [
       "http://localhost:4200"
     ]
   }
   ```

3. **Verify API URL** in frontend environment:
   ```typescript
   // src/environments/environment.ts
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:5001'
   };
   ```

### Database Connection Issues

#### **Symptom**: `Connection refused` or `Authentication failed`

**Solution**:
1. **For Docker deployments**:
   ```bash
   # Check if database container is running
   docker-compose ps
   
   # View logs
   docker-compose logs database
   ```

2. **Verify connection string** in `appsettings.Development.json`:
   ```json
   {
     "ConnectionStrings": {
       "TodoContext": "Host=localhost;Port=5432;Database=TodoDb;Username=postgres;Password=postgres"
     }
   }
   ```

3. **Test connection manually# 📝 Usage Guide

Learn how to effectively use the Todo List Application with its comprehensive feature set.

## 🎨 User Interface Overview

The application features a clean, intuitive interface with the following key areas:

1. **Header Section** - Application title and summary information
2. **Input Section** - Add new todos with optional deadlines
3. **Todo List** - Display of all todos with status indicators
4. **Footer Section** - Todo counter and filtering options

## ➕ Adding Todos

### Basic Todo Creation
1. Type your todo in the input field at the top
2. Press **Enter** or click the **Add** button
3. Your new todo will appear at the top of the list

### Todo with Deadline
1. Type your todo in the input field
2. Click the **📅** (calendar) icon next to the input
3. Select date and time using the datetime picker
4. Press **Enter** or click the **Add** button

### Todo Priority Levels
The application automatically calculates priority based on deadlines:
- **🔴 Urgent** - Due within 2 hours
- **🟠 High** - Due within 24 hours
- **🔵 Medium** - Due within 7 days
- **🟢 Low** - Due in more than 7 days

## ✅ Managing Todo Status

### Marking as Complete
1. Click the checkbox next to any todo
2. The todo will show strikethrough text and gray color
3. The todo counter will decrease

### Marking as Incomplete
1. Click the checkbox next to a completed todo
2. The todo styling will return to normal
3. The todo counter will increase

## 📅 Deadline Management

### Adding Deadlines to Existing Todos
1. Click the **📅** (calendar) icon on any todo
2. Select date and time using the datetime picker
3. The deadline will be saved automatically

### Removing Deadlines
1. Click the **📅** (calendar) icon on any todo with a deadline
2. Clear the date selection
3. The deadline will be removed

### Countdown Timers
Todos with deadlines show real-time countdown timers:
- **2d 5h** - 2 days and 5 hours remaining
- **3h 45m** - 3 hours and 45 minutes remaining
- **15m** - 15 minutes remaining
- **Overdue** - Past the deadline

## 🗑️ Deleting Todos

### Delete Individual Todo
1. Click the **🗑️** (trash) icon on any todo
2. Confirm deletion in the prompt
3. The todo will be removed from the list

### Clear Completed Todos
1. Click the **Clear completed** button in the footer
2. All completed todos will be removed
3. Active todos remain in the list

## 🔍 Filtering and Sorting

### Filter by Status
Use the footer buttons to filter todos:
- **All** - Show all todos (default)
- **Active** - Show only incomplete todos
- **Completed** - Show only completed todos

### Automatic Sorting
Todos are automatically sorted by priority:
1. **Overdue** items appear first
2. **Urgent** items (due within 2 hours)
3. **High** priority items (due within 24 hours)
4. **Medium** priority items (due within 7 days)
5. **Low** priority items (due in more than 7 days)
6. **No deadline** items appear last

## 📊 Todo Counter

The footer displays the current count of active todos:
- Shows number of incomplete todos
- Updates in real-time as you complete/delete todos
- Displays "0 items left" when all todos are completed

## ⌨️ Keyboard Shortcuts

### Navigation
- **Enter** - Add new todo or save deadline
- **Tab** - Move between interface elements
- **Esc** - Close datetime picker or modals

### Todo Management
- **Space** - Toggle todo completion when focused
- **Delete** - Remove todo when focused (with confirmation)

## 📱 Responsive Design

The application works on all device sizes:
- **Desktop** - Full feature set with wide layout
- **Tablet** - Optimized touch targets and spacing
- **Mobile** - Simplified layout with large buttons

## 🔄 Data Persistence

All todos are automatically saved:
- **LocalStorage** - Todos persist between browser sessions
- **Backend API** - Todos synchronized with .NET backend
- **Real-time Updates** - Changes appear immediately across devices

## 🛠️ Settings and Customization

### Theme Options
- **Light Mode** - Default clean white theme
- **Dark Mode** - Reduced eye strain for nighttime use
- **System Preference** - Automatically match OS theme

### Display Options
- **Show/Hide completed** - Toggle visibility of completed todos
- **Auto-sort** - Enable/disable automatic priority sorting
- **Deadline reminders** - Enable browser notifications (future feature)

## 🆘 Troubleshooting

### Common Usage Issues

1. **Todos not saving**
   - Check browser console for errors
   - Verify localStorage is enabled
   - Ensure backend API is running

2. **Deadlines not updating**
   - Refresh the page to reload data
   - Check network connection to backend
   - Verify datetime picker selection

3. **Sorting not working**
   - Ensure todos have deadlines for priority sorting
   - Refresh page to reset sorting algorithm

### Getting Help

- 📚 **Documentation**: Comprehensive guides in wiki
- 🐛 **Issues**: GitHub Issues for usage problems
- 💬 **Discussions**: GitHub Discussions for questions

---
**🎉 You're now an expert in using the Todo List Application!**