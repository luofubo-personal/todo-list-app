# Terraform Configuration for Todo List Application

This directory contains Terraform configuration files to deploy the Todo List application to Azure.

## Resources Created

1. Resource Group
2. App Service Plan (Linux)
3. App Service (for the .NET backend)
4. SQL Server
5. SQL Database
6. SQL Firewall Rule

## Prerequisites

1. [Terraform](https://www.terraform.io/downloads.html) installed
2. Azure CLI installed and authenticated
3. Azure subscription

## Usage

1. Initialize Terraform:
   ```
   terraform init
   ```

2. Plan the deployment:
   ```
   terraform plan
   ```

3. Deploy the infrastructure:
   ```
   terraform apply
   ```

4. To destroy the infrastructure:
   ```
   terraform destroy
   ```

## Variables

The following variables can be customized in `terraform.tfvars`:

- `resource_group_name`: The name of the resource group to create
- `location`: The Azure region to deploy resources to
- `app_service_plan_name`: The name of the App Service Plan
- `app_service_name`: The name of the App Service
- `sql_server_name`: The name of the SQL Server
- `sql_database_name`: The name of the SQL Database
- `sql_admin_username`: The SQL Server administrator username
- `sql_admin_password`: The SQL Server administrator password

## Outputs

After deployment, Terraform will output:

- `resource_group_name`: The name of the created resource group
- `app_service_url`: The URL of the deployed App Service
- `sql_server_name`: The name of the created SQL Server
- `sql_database_name`: The name of the created SQL Database