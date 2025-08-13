# 🐳 Docker Usage Guide

This guide explains how to use Docker and Docker Compose for local development and testing.

## 🚀 Quick Start

### Default Setup (PostgreSQL)
```bash
# Start all services with PostgreSQL database
docker-compose up --build

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### SQL Server Setup (Optional)
```bash
# Start with SQL Server instead of PostgreSQL
docker-compose --profile sqlserver up --build

# Or set environment variable
COMPOSE_PROFILES=sqlserver docker-compose up
```

## 📊 Available Services

### Core Services (Always Available)
- **Backend API**: http://localhost:5001
- **Frontend**: http://localhost:4200
- **PostgreSQL**: localhost:5432 (default database)
- **Redis**: localhost:6379

### Optional Services
- **SQL Server**: localhost:1433 (with --profile sqlserver)
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3000 (admin/admin123)

## 🗄️ Database Options

### PostgreSQL (Default - Recommended for CI/CD)
- **Lighter resource usage**
- **Faster startup time**
- **Better for GitHub Actions**
- **Connection**: `Host=database;Port=5432;Database=TodoDb;Username=todouser;Password=todopass123`

### SQL Server (Optional - Production-like)
- **Production environment match**
- **Higher resource usage**
- **Slower startup time**
- **Connection**: `Server=sqlserver,1433;Database=TodoDb;User Id=sa;Password=YourStrong@Passw0rd123;TrustServerCertificate=true`

## 🔧 Development Workflow

### 1. Start Development Environment
```bash
# Start all services
docker-compose up -d

# Check service status
docker-compose ps

# View logs for specific service
docker-compose logs backend
docker-compose logs frontend
```

### 2. Make Code Changes
- Backend changes: Container will auto-reload with volume mounts
- Frontend changes: Rebuild frontend container or develop locally

### 3. Run Tests
```bash
# Backend tests
docker-compose exec backend dotnet test

# Frontend tests (if running locally)
cd frontend/angular-app
npm test
```

### 4. Database Management
```bash
# Connect to PostgreSQL
docker-compose exec database psql -U todouser -d TodoDb

# Connect to SQL Server (if using)
docker-compose exec sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd123

# Reset database
docker-compose down -v  # Removes volumes
docker-compose up -d
```

## 🛠️ Troubleshooting

### Common Issues

#### Container Fails to Start
```bash
# Check logs
docker-compose logs [service-name]

# Restart specific service
docker-compose restart [service-name]

# Rebuild containers
docker-compose up --build --force-recreate
```

#### Database Connection Issues
```bash
# Check database health
docker-compose exec database pg_isready -U todouser -d TodoDb

# Or for SQL Server
docker-compose exec sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd123 -Q "SELECT 1"
```

#### Port Conflicts
```bash
# Check what's using ports
lsof -i :5001  # Backend
lsof -i :4200  # Frontend
lsof -i :5432  # PostgreSQL
lsof -i :1433  # SQL Server

# Kill conflicting processes
kill -9 [PID]
```

### Resource Issues
```bash
# Check Docker resource usage
docker stats

# Clean up unused resources
docker system prune -a

# Remove all containers and volumes
docker-compose down -v --remove-orphans
```

## 🔍 Monitoring

### Application Monitoring
- **Grafana**: http://localhost:3000
  - Username: admin
  - Password: admin123
- **Prometheus**: http://localhost:9090

### Health Checks
```bash
# Backend health
curl http://localhost:5001/health

# Frontend
curl http://localhost:4200

# Database health
docker-compose exec database pg_isready -U todouser -d TodoDb
```

## 📝 Configuration

### Environment Variables
Create `.env` file in project root:
```env
# Database
POSTGRES_DB=TodoDb
POSTGRES_USER=todouser
POSTGRES_PASSWORD=todopass123

# Backend
ASPNETCORE_ENVIRONMENT=Development

# Monitoring
GRAFANA_ADMIN_PASSWORD=admin123
```

### Custom Configuration
```bash
# Override specific services
docker-compose -f docker-compose.yml -f docker-compose.override.yml up

# Use different environment
docker-compose --env-file .env.production up
```

## 🚀 Production Deployment

### Build Production Images
```bash
# Build optimized images
docker-compose -f docker-compose.prod.yml build

# Push to registry
docker-compose -f docker-compose.prod.yml push
```

### Security Considerations
- Change default passwords
- Use secrets management
- Enable SSL/TLS
- Configure firewall rules
- Use non-root users

## 📚 Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)
- [SQL Server Docker Image](https://hub.docker.com/_/microsoft-mssql-server)
- [.NET Docker Guide](https://docs.microsoft.com/en-us/dotnet/core/docker/)

---

**Last Updated**: January 2025  
**Status**: PostgreSQL default, SQL Server optional ✅
