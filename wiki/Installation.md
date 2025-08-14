# 🛠️ Installation Guide

Detailed installation instructions for the Todo List Application, covering all supported platforms and configurations.

## 📋 Prerequisites

Before installing the application, ensure you have the following prerequisites:

### Core Requirements
- **Node.js 18+** and npm
- **.NET 9 SDK**
- **Git** (for cloning the repository)
- **Modern Web Browser** (Chrome, Firefox, Safari, Edge)

### Optional Requirements
- **Docker** (for containerized deployment)
- **Docker Compose** (for multi-service deployment)
- **Azure CLI** (for Azure deployment)
- **Terraform** (for Infrastructure as Code deployment)

## 🖥️ Platform-Specific Installation

### Windows

1. **Install Node.js and npm**
   - Download from https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **Install .NET 9 SDK**
   - Download from https://dotnet.microsoft.com/download/dotnet/9
   - Verify installation: `dotnet --version`

3. **Install Git**
   - Download from https://git-scm.com/
   - Verify installation: `git --version`

### macOS

1. **Install Node.js and npm**
   ```bash
   # Using Homebrew (recommended)
   brew install node
   
   # Or download from https://nodejs.org/
   ```

2. **Install .NET 9 SDK**
   ```bash
   # Using Homebrew
   brew install dotnet
   
   # Or download from https://dotnet.microsoft.com/download/dotnet/9
   ```

3. **Install Git**
   ```bash
   # Using Homebrew
   brew install git
   
   # Or download from https://git-scm.com/
   ```

### Linux (Ubuntu/Debian)

1. **Install Node.js and npm**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Install .NET 9 SDK**
   ```bash
   wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
   sudo dpkg -i packages-microsoft-prod.deb
   sudo apt-get update
   sudo apt-get install -y dotnet-sdk-9.0
   ```

3. **Install Git**
   ```bash
   sudo apt-get update
   sudo apt-get install git
   ```

## 🚀 Application Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd todo-list-app
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend/TodoApi
```

Restore .NET dependencies:
```bash
dotnet restore
```

### 3. Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend/angular-app
```

Install npm dependencies:
```bash
npm install
```

## 🐳 Docker Installation

For containerized deployment, Docker installation is required.

### Windows/macOS
1. Download Docker Desktop from https://www.docker.com/products/docker-desktop
2. Follow the installation wizard
3. Start Docker Desktop

### Linux
```bash
# Update package index
sudo apt-get update

# Install Docker
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## ☁️ Cloud Provider Setup

### Azure CLI Installation

#### Windows
```bash
# Download from https://aka.ms/installazurecliwindows
# Or using PowerShell
Invoke-WebRequest -Uri https://aka.ms/installazurecliwindows -OutFile .\AzureCLI.msi
Start-Process msiexec.exe -Wait -ArgumentList '/I AzureCLI.msi'
```

#### macOS
```bash
brew install azure-cli
```

#### Linux
```bash
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

### Terraform Installation

#### Windows
```bash
# Using Chocolatey
choco install terraform

# Or download from https://www.terraform.io/downloads.html
```

#### macOS
```bash
brew install terraform
```

#### Linux
```bash
wget https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_linux_amd64.zip
unzip terraform_1.6.0_linux_amd64.zip
sudo mv terraform /usr/local/bin/
```

## 🔧 Environment Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```bash
# Backend (.NET)
ASPNETCORE_ENVIRONMENT=Development
ConnectionStrings__TodoContext="your-connection-string"

# Frontend (Angular)
API_URL=http://localhost:5001
```

### Database Configuration

#### In-Memory Database (Development Default)
No configuration required - works out of the box.

#### PostgreSQL
```bash
# Connection string format
Host=localhost;Port=5432;Database=TodoDb;Username=your-user;Password=your-password
```

#### SQL Server
```bash
# Connection string format
Server=localhost;Database=TodoDb;User Id=your-user;Password=your-password;TrustServerCertificate=true;
```

## ✅ Verification

After installation, verify all components are correctly installed:

### Check Versions
```bash
node --version
npm --version
dotnet --version
git --version
docker --version
docker-compose --version
```

### Run Tests
```bash
# Backend tests
cd backend/TodoApi.Tests
dotnet test

# Frontend tests
cd frontend/angular-app
npm test
```

## 🆘 Troubleshooting

### Common Installation Issues

1. **Permission errors with npm**
   ```bash
   # Fix npm permissions
   sudo chown -R $(whoami) ~/.npm
   ```

2. **.NET SDK not found**
   ```bash
   # Add to PATH
   export PATH="$PATH:/usr/local/share/dotnet"
   ```

3. **Docker permission denied**
   ```bash
   # Add user to docker group
   sudo usermod -aG docker $USER
   ```

4. **Node.js version conflicts**
   ```bash
   # Use nvm to manage versions
   nvm install 18
   nvm use 18
   ```

### Getting Help

- 📚 **Documentation**: Comprehensive guides in wiki
- 🐛 **Issues**: GitHub Issues for installation problems
- 💬 **Discussions**: GitHub Discussions for questions

---
**🎉 Installation complete! You're ready to start developing.**