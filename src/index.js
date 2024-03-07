const { Client } = require('pg');
const fs = require('fs');

class MigrationTool {
    constructor(connectionString) {
        this.client = new Client({ connectionString });
    }

    async connect() {
        try {
            await this.client.connect();
            console.log('Connected to PostgreSQL database');
        } catch (error) {
            throw new Error(`Failed to connect to PostgreSQL database: ${error.message}`);
        }
    }

    async disconnect() {
        try {
            await this.client.end();
            console.log('Disconnected from PostgreSQL database');
        } catch (error) {
            throw new Error(`Failed to disconnect from PostgreSQL database: ${error.message}`);
        }
    }

    async migrate(migrationFolderPath) {
        try {
            const files = fs.readdirSync(migrationFolderPath).sort();

            for (const file of files) {
                const sql = fs.readFileSync(`${migrationFolderPath}/${file}`, 'utf8');
                await this.client.query(sql);
                console.log(`Executed migration: ${file}`);
            }

            console.log('Database migration completed successfully');
        } catch (error) {
            throw new Error(`Failed to migrate database: ${error.message}`);
        }
    }
}

module.exports = MigrationTool;
