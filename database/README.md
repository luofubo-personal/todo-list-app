# Database Configuration for Todo List Application

This directory contains the SQL schema and seed data for the Todo List application database.

## Schema

The database contains a single table:

### Todos Table

| Column    | Type         | Description                  |
|-----------|--------------|------------------------------|
| Id        | INT          | Primary key, auto-increment  |
| Text      | NVARCHAR(MAX)| Todo item text               |
| Completed | BIT          | Completion status            |
| Timestamp | DATETIME2    | Creation timestamp           |

## Indexes

- Primary key index on `Id`
- Non-clustered index on `Completed` for better query performance

## Seed Data

The schema includes sample todo items to get started:

1. Create Azure infrastructure (completed)
2. Deploy .NET backend (completed)
3. Configure SQL database (not completed)
4. Update documentation (not completed)

## Deployment

To deploy the schema to Azure SQL Database:

1. Connect to your Azure SQL Database using a tool like Azure Data Studio or SQL Server Management Studio
2. Execute the `azure-sql-schema.sql` script
3. Verify that the table and seed data have been created successfully

## Entity Framework Integration

The .NET backend uses Entity Framework Core to interact with the database. The `TodoContext` class in the backend maps to the `Todos` table, and the `Todo` model class represents the table structure.