const mysql = require('mysql2');

// Connect to the database
const db = mysql.createConnection (
    {
        host: 'localHost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: '',
        database: 'company'
    },
    console.log('Connected to the company database.')
); 

module.exports = db;