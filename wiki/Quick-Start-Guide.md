# 🏃‍♂️ Quick Start Guide

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
**🎉 You're ready to start using the Todo List Application!**