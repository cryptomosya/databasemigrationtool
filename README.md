const MigrationTool = require('database-migration-tool');
// Initialize migration tool with PostgreSQL connection string
const migrationTool = new MigrationTool('postgresql://username:password@localhost:5432/database');
// Connect to the database
await migrationTool.connect();
// Perform database migration with migration files located in 'migrations' folder
await migrationTool.migrate('./migrations');
// Disconnect from the database
await migrationTool.disconnect();
Features
Simple and intuitive API for database migration tasks.
Supports PostgreSQL as the database system.
Easily integrate migrations into your Node.js applications.

