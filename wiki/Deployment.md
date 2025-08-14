# 🚀 Deployment Guide

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
*From local development to enterprise-scale production deployments*