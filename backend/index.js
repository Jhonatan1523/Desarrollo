const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config(); // Cargar las variables de entorno

const app = express();
const PORT = process.env.PORT || 3000; // Puerto configurado en .env o 3000 por defecto

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// Middleware para parsear JSON
app.use(express.json());

// Ruta para obtener datos de la tabla usuarios
app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios'); // Consulta a la tabla usuarios
        res.json(result.rows); // Devolver los datos en formato JSON
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});