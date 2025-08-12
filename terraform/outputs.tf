output "resource_group_name" {
  value = azurerm_resource_group.todo_rg.name
}

output "app_service_url" {
  value = "https://${azurerm_app_service.todo_app.default_site_hostname}"
}

output "sql_server_name" {
  value = azurerm_sql_server.todo_sql_server.name
}

output "sql_database_name" {
  value = azurerm_sql_database.todo_db.name
}