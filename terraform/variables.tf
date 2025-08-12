variable "resource_group_name" {
  description = "The name of the resource group to create"
  type        = string
  default     = "todo-app-rg"
}

variable "location" {
  description = "The Azure region to deploy resources to"
  type        = string
  default     = "East US"
}

variable "app_service_plan_name" {
  description = "The name of the App Service Plan"
  type        = string
  default     = "todo-app-plan"
}

variable "app_service_name" {
  description = "The name of the App Service"
  type        = string
  default     = "todo-app-service"
}

variable "sql_server_name" {
  description = "The name of the SQL Server"
  type        = string
  default     = "todo-sql-server"
}

variable "sql_database_name" {
  description = "The name of the SQL Database"
  type        = string
  default     = "todo-db"
}

variable "sql_admin_username" {
  description = "The SQL Server administrator username"
  type        = string
  default     = "todoadmin"
}

variable "sql_admin_password" {
  description = "The SQL Server administrator password"
  type        = string
  default     = "TodoPassword123!"
}