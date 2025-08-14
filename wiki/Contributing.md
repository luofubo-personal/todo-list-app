# 🤝 Contributing Guide

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
- F