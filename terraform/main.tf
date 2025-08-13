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

resource "azurerm_service_plan" "todo_plan" {
  name                = var.app_service_plan_name
  location            = azurerm_resource_group.todo_rg.location
  resource_group_name = azurerm_resource_group.todo_rg.name
  os_type             = "Linux"
  sku_name            = "B1"
}

resource "azurerm_linux_web_app" "todo_app" {
  name                = var.app_service_name
  location            = azurerm_resource_group.todo_rg.location
  resource_group_name = azurerm_resource_group.todo_rg.name
  service_plan_id     = azurerm_service_plan.todo_plan.id
  https_only          = true

  site_config {
    always_on = true

    application_stack {
      dotnet_version = "9.0"
    }
  }

  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    "ASPNETCORE_ENVIRONMENT"              = "Production"
  }

  connection_string {
    name  = "TodoContext"
    type  = "SQLServer"
    value = "Server=tcp:${azurerm_mssql_server.todo_sql_server.fully_qualified_domain_name},1433;Initial Catalog=${azurerm_mssql_database.todo_db.name};Persist Security Info=False;User ID=${var.sql_admin_username};Password=${var.sql_admin_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
  }
}

resource "azurerm_mssql_server" "todo_sql_server" {
  name                         = var.sql_server_name
  resource_group_name          = azurerm_resource_group.todo_rg.name
  location                     = azurerm_resource_group.todo_rg.location
  version                      = "12.0"
  administrator_login          = var.sql_admin_username
  administrator_login_password = var.sql_admin_password
  minimum_tls_version          = "1.2"

  azuread_administrator {
    login_username = var.sql_admin_username
    object_id      = data.azurerm_client_config.current.object_id
  }
}

resource "azurerm_mssql_database" "todo_db" {
  name           = var.sql_database_name
  server_id      = azurerm_mssql_server.todo_sql_server.id
  collation      = "SQL_Latin1_General_CP1_CI_AS"
  max_size_gb    = 2
  sku_name       = "Basic"
  zone_redundant = false

  lifecycle {
    ignore_changes = [
      max_size_gb,
    ]
  }
}

resource "azurerm_mssql_firewall_rule" "todo_firewall" {
  name             = "AllowAzureServices"
  server_id        = azurerm_mssql_server.todo_sql_server.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

data "azurerm_client_config" "current" {}