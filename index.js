require('dotenv').config();

const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

// Crear el servidor express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo de body
app.use( express.json() );

// Base de datos
dbConnection();

// console.log( process.env );

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

// Levantar el servicio
app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});

