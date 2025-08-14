# 🆘 Troubleshooting Guide

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

3. **Test connection manually