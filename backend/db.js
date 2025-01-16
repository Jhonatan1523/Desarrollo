require('dotenv').config(); // Cargar las variables de entorno desde .env
const { Pool } = require('pg');


// Configuración de la conexión a PostgreSQL usando variables de entorno
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // Puerto desde .env
});

// Exportar el pool para reutilizarlo
module.exports = pool;