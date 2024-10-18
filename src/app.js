const express = require('express');
const app = express();
const morgan = require('morgan');
// const userRoutes = require('./routes/userRoutes');

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.get('/', (req, res) => {
    res.send('Hola mundo!');
  });

// Manejo de errores
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app;
