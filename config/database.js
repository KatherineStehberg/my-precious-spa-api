const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'joyas',
    password: 'Vivachile28!', // Reemplaza con tu contraseña
    port: 5432,
});

module.exports = pool;
