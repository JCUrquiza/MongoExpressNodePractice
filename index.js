require('dotenv').config();

const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');


// Crear el servidor express
const app = express();


// Configurar CORS
app.use(cors);


// Base de datos
dbConnection();


// console.log( process.env );


// jcUser
// 5ntkozV7TTdhOAlW
// mongodb+srv://jcUser:*****@cluster0.xovqe.mongodb.net/hospitaldb?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true


// Rutas
app.get('/', (req, res) => {

    res.status(200).json({
        ok: true,
        msg: 'Hola mundo'
    })

});


// Levantar el servicio
app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});


