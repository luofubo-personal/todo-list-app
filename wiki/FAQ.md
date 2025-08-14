# ❓ Frequently Asked Questions

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
**Didn't find your question?** Check the relevant documentation sections or create an issue to ask!