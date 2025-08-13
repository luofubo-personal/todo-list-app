output "resource_group_name" {
  value = azurerm_resource_group.todo_rg.name
}

output "app_service_url" {
  value = "https://${azurerm_linux_web_app.todo_app.default_hostname}"
}

output "sql_server_name" {
  value = azurerm_mssql_server.todo_sql_server.name
}

output "sql_database_name" {
  value = azurerm_mssql_database.todo_db.name
}

output "sql_server_fqdn" {
  value = azurerm_mssql_server.todo_sql_server.fully_qualified_domain_name
}