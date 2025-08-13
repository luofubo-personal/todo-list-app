# Deployment Guide

## Simple Version Deployment

### Local Development
1. Open `index.html` in any modern web browser
2. No server required - runs entirely client-side

### Static Hosting (GitHub Pages, Netlify, Vercel)
1. Upload `index.html`, `script.js` (compiled from TypeScript), and `style.css`
2. Configure your hosting provider to serve `index.html` as the default page

## Full-Stack Version Deployment

### Prerequisites
- Azure subscription with appropriate permissions
- Azure CLI installed and authenticated
- Terraform installed (v1.0+)
- .NET 9 SDK
- Node.js and npm (for Angular)

### Step 1: Infrastructure Setup

1. **Configure Terraform variables**:
   ```bash
   cd terraform
   cp terraform.tfvars.example terraform.tfvars
   # Edit terraform.tfvars with your values
   ```

2. **Deploy infrastructure**:
   ```bash
   terraform init
   terraform plan
   terraform apply
   ```

3. **Note the outputs** (especially `app_service_url` and `sql_server_fqdn`)

### Step 2: Database Setup

1. **Apply database schema**:
   ```bash
   # Connect to your Azure SQL Database
   sqlcmd -S <sql_server_fqdn> -d <database_name> -U <username> -P <password>
   # Run the script from database/azure-sql-schema.sql
   ```

### Step 3: Backend Deployment

1. **Build and publish**:
   ```bash
   cd backend/TodoApi
   dotnet publish -c Release -o ./publish
   ```

2. **Deploy to Azure App Service**:
   ```bash
   # Using Azure CLI
   az webapp deployment source config-zip \
     --resource-group <resource-group> \
     --name <app-service-name> \
     --src ./publish.zip
   ```

3. **Configure connection string** in Azure Portal or via CLI

### Step 4: Frontend Deployment

1. **Update environment configuration**:
   ```typescript
   // frontend/angular-app/src/environments/environment.prod.ts
   export const environment = {
     production: true,
     apiUrl: 'https://your-app-service-url'
   };
   ```

2. **Build for production**:
   ```bash
   cd frontend/angular-app
   npm install
   ng build --configuration production
   ```

3. **Deploy to static hosting** (Azure Static Web Apps, CDN, etc.)

### Step 5: Security Configuration

1. **Update CORS origins** in `appsettings.Production.json`
2. **Configure SSL certificates**
3. **Set up monitoring and logging**

## Environment Variables

### Backend (.NET)
- `ConnectionStrings__TodoContext`: SQL Server connection string
- `ASPNETCORE_ENVIRONMENT`: Set to "Production"
- `AllowedOrigins__0`: Frontend URL for CORS

### Frontend (Angular)
- `API_URL`: Backend API URL

## Monitoring and Maintenance

1. **Application Insights** for monitoring
2. **Azure Monitor** for infrastructure metrics
3. **Regular security updates** for dependencies
4. **Database backup strategy**
5. **SSL certificate renewal**

## Troubleshooting

### Common Issues
1. **CORS errors**: Check AllowedOrigins configuration
2. **Database connection**: Verify connection string and firewall rules
3. **SSL issues**: Ensure certificates are properly configured
4. **Performance**: Monitor Application Insights for bottlenecks

### Logs Location
- **Backend**: Azure App Service logs
- **Frontend**: Browser developer tools
- **Infrastructure**: Azure Monitor logs
