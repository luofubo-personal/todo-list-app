terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "todo_rg" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_app_service_plan" "todo_plan" {
  name                = var.app_service_plan_name
  location            = azurerm_resource_group.todo_rg.location
  resource_group_name = azurerm_resource_group.todo_rg.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Basic"
    size = "B1"
  }
}

resource "azurerm_app_service" "todo_app" {
  name                = var.app_service_name
  location            = azurerm_resource_group.todo_rg.location
  resource_group_name = azurerm_resource_group.todo_rg.name
  app_service_plan_id = azurerm_app_service_plan.todo_plan.id
  https_only          = true

  site_config {
    linux_fx_version = "DOTNETCORE|6.0"
    always_on        = true
  }

  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    "ASPNETCORE_ENVIRONMENT"                = "Production"
    "ConnectionStrings:TodoContext"       = "Server=tcp:${azurerm_sql_server.todo_sql_server.name}.database.windows.net,1433;Initial Catalog=${azurerm_sql_database.todo_db.name};Persist Security Info=False;User ID=${var.sql_admin_username};Password=${var.sql_admin_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
  }
}

resource "azurerm_sql_server" "todo_sql_server" {
  name                         = var.sql_server_name
  resource_group_name          = azurerm_resource_group.todo_rg.name
  location                     = azurerm_resource_group.todo_rg.location
  version                      = "12.0"
  administrator_login          = var.sql_admin_username
  administrator_login_password = var.sql_admin_password
}

resource "azurerm_sql_database" "todo_db" {
  name                = var.sql_database_name
  resource_group_name = azurerm_resource_group.todo_rg.name
  location            = azurerm_resource_group.todo_rg.location
  server_name         = azurerm_sql_server.todo_sql_server.name
  edition             = "Basic"
  collation           = "SQL_Latin1_General_CP1_CI_AS"
  max_size_bytes      = "2147483648" # 2GB

  lifecycle {
    ignore_changes = [
      max_size_bytes,
    ]
  }
}

resource "azurerm_sql_firewall_rule" "todo_firewall" {
  name                = "AllowAzureServices"
  resource_group_name = azurerm_resource_group.todo_rg.name
  server_name         = azurerm_sql_server.todo_sql_server.name
  start_ip_address    = "0.0.0.0"
  end_ip_address      = "0.0.0.0"
}