const mysql = require('mysql2');

// Connect to the database
const db = mysql.createConnection(
    {
        host: 'localHost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: '',
        database: 'election'
    },
    console.log('Connected to the election database.')
); 

module.exports = db;