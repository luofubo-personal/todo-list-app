# 🛠️ Development Guide

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
**🎉 Happy coding! You're ready to contribute to the Todo List Application.**