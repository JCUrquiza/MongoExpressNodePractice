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

// File upload
// app.use( fileUpload({ useTempFiles: true }) );

// Base de datos
dbConnection();

// Directorio público
app.use(express.static('public'));

// console.log( process.env );

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));

// app.use( fileUpload({ useTempFiles: true }) );

// Levantar el servicio
app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});

