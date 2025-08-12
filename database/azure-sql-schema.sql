-- Create the Todos table
CREATE TABLE [dbo].[Todos] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Text]        NVARCHAR (MAX) NOT NULL,
    [Completed]   BIT            NOT NULL,
    [Timestamp]   DATETIME2 (7)  NOT NULL,
    CONSTRAINT [PK_Todos] PRIMARY KEY CLUSTERED ([Id] ASC)
);

-- Create an index on the Completed column for better query performance
CREATE NONCLUSTERED INDEX [IX_Todos_Completed]
    ON [dbo].[Todos]([Completed] ASC);

-- Insert some sample data
INSERT INTO [dbo].[Todos] ([Text], [Completed], [Timestamp])
VALUES 
    ('Create Azure infrastructure', 1, GETUTCDATE()),
    ('Deploy .NET backend', 1, GETUTCDATE()),
    ('Configure SQL database', 0, GETUTCDATE()),
    ('Update documentation', 0, GETUTCDATE());