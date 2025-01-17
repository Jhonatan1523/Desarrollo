require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('./middleware/corsMiddleware'); // Usamos el middleware CORS
const userRoutes = require('./routes/userRoutes'); // Rutas de los usuarios

const PORT = process.env.PORT;

// Configuración de middleware
app.use(cors); // CORS
app.use(express.json()); // Middleware para parsear JSON

// Usar las rutas
app.use(userRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});