# ⚙️ Environment Configuration

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
            IssuerSigningKey = new SymmetricSecurityKey(Encoding