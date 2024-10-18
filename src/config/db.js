// src/config/db.js
const mysql = require('mysql2');

// Crear el pool de conexiones a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Número máximo de conexiones que se pueden mantener en el pool
  queueLimit: 0 // Sin límite en la cola de conexiones
});

// Promisificar el pool para usar con async/await
const promisePool = pool.promise();

// Exportar el pool prometido
module.exports = promisePool;
