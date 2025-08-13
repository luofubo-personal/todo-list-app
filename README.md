# Todo List Application - Multi-Implementation Project

This project contains **two different implementations** of a todo list application:

## 🚀 Implementation Options

### Option 1: Simple Client-Side Application (Root Directory)
- **Files**: `index.html`, `script.ts`, `style.css`
- **Technology**: Pure HTML/CSS/TypeScript with localStorage
- **Use Case**: Quick prototyping, learning, or simple deployment
- **Data Storage**: Browser localStorage (client-side only)

### Option 2: Full-Stack Cloud Application (Subdirectories)
- **Frontend**: Angular application (`frontend/angular-app/`)
- **Backend**: .NET 9 Web API (`backend/TodoApi/`)
- **Database**: Azure SQL Database
- **Infrastructure**: Azure App Service with Terraform IaC
- **Use Case**: Production-ready, scalable cloud application

## 🏗️ Architecture (Full-Stack Version)

The full-stack application follows a modern cloud architecture:

1. **Frontend**: Angular application with TypeScript
2. **Backend**: .NET 9 Web API with Entity Framework Core
3. **Database**: Azure SQL Database with proper indexing
4. **Infrastructure**: Azure App Service for the backend
5. **Deployment**: Terraform scripts for infrastructure as code
6. **Security**: CORS configuration, input validation, error handling

## 📁 Project Structure

```
todo-list-app/
├── index.html            # Simple version - HTML entry point
├── script.ts             # Simple version - TypeScript logic
├── style.css             # Simple version - Styling
├── tsconfig.json         # TypeScript configuration for simple version
├── frontend/             # Full-stack version - Angular frontend
│   └── angular-app/      # Angular application
├── backend/              # Full-stack version - .NET 9 Web API
│   ├── TodoApi/          # Main API project
│   └── TodoApi.Tests/    # Unit tests
├── terraform/            # Infrastructure as Code (Azure)
├── database/             # SQL database schema and seed data
├── README.md             # This file
└── LICENSE               # License information
```

## 🎯 Quick Start Guide

### Simple Version (Client-Side Only)

1. **Compile TypeScript** (optional):
   ```bash
   tsc script.ts
   ```

2. **Open in browser**:
   ```bash
   open index.html
   ```

### Full-Stack Version

Choose this for production applications with user authentication, data persistence, and scalability.

## ✨ Features

### Simple Version
- ✅ Add new todo items
- ✅ Mark todos as complete/incomplete
- ✅ Delete todos
- ✅ Data persistence using localStorage
- ✅ Responsive design for all devices
- ✅ Clean and modern UI

### Full-Stack Version
- ✅ All simple version features
- ✅ RESTful API with comprehensive error handling
- ✅ Input validation and sanitization
- ✅ Azure SQL Database with proper indexing
- ✅ Secure CORS configuration
- ✅ HTTPS enforcement
- ✅ Comprehensive unit test coverage
- ✅ Infrastructure as Code with Terraform
- ✅ Environment-specific configuration
- ✅ Production-ready logging and monitoring setup

## Prerequisites

### For Development

1. Node.js and npm (for Angular frontend)
2. .NET 6 SDK (for backend)
3. Azure CLI (for Azure deployment)
4. Terraform (for infrastructure as code)

### For Deployment

1. Azure subscription
2. Azure CLI authenticated with appropriate permissions
3. Terraform installed

## Getting Started

### Frontend (Angular)

1. Navigate to the frontend directory:
   ```
   cd frontend/angular-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   ng serve
   ```

4. Open your browser to http://localhost:4200

### Backend (.NET)

1. Navigate to the backend directory:
   ```
   cd backend/TodoApi
   ```

2. Run the application:
   ```
   dotnet run
   ```

3. The API will be available at https://localhost:5001

### Database

1. Create an Azure SQL Database using the Terraform scripts
2. Apply the schema from `database/azure-sql-schema.sql`

## Deployment

### Using Terraform

1. Navigate to the terraform directory:
   ```
   cd terraform
   ```

2. Initialize Terraform:
   ```
   terraform init
   ```

3. Plan the deployment:
   ```
   terraform plan
   ```

4. Deploy the infrastructure:
   ```
   terraform apply
   ```

5. Note the output values, particularly the `app_service_url`

### Deploying the Application

1. Build the .NET application:
   ```
   cd backend/TodoApi
   dotnet publish -c Release
   ```

2. Deploy the published files to the Azure App Service

3. Update the connection string in the Azure App Service configuration

## API Endpoints

The backend API provides the following endpoints:

- `GET /api/todos` - Get all todos
- `GET /api/todos/{id}` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/{id}` - Update a todo
- `DELETE /api/todos/{id}` - Delete a todo

## Development

### Frontend Development

The Angular frontend is structured as follows:

- `src/app/app.module.ts` - Root module
- `src/app/app.component.ts` - Root component
- `src/app/todo-list/` - Todo list component
- `src/app/todo-item/` - Todo item component
- `src/app/todo.service.ts` - Service for API communication
- `src/app/todo.ts` - Todo interface

### Backend Development

The .NET backend is structured as follows:

- `Program.cs` - Application entry point
- `Todo.cs` - Todo model
- `TodoContext.cs` - Entity Framework context
- `TodosController.cs` - API controller
- `appsettings.json` - Configuration file

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Angular for the frontend framework
- .NET for the backend framework
- Azure for cloud infrastructure
- Terraform for infrastructure as code