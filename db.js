const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Connect to the SQLite database (creates database.db if it doesn't exist)
const dbPath = path.resolve(__dirname, 'database.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');

        // Automatically read schema.sql to create the table and insert data
        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

        db.exec(schema, (err) => {
            if (err) {
                console.error('Error running schema:', err.message);
            } else {
                console.log('Database schema loaded and sample data inserted.');
            }
        });
    }
});

module.exports = db;