const { response } = require('express');
const Hospital = require('../models/hospital');


const getHospitales = async ( req, res = response ) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre email');

    res.status(200).json({
        ok: true,
        hospitales
    });

}

const crearHospital = async ( req, res = response ) => {

    // Obtener el id del usuario (lo tenemos en request)
    const uid = req.uid;
    
    const hospital =  new Hospital({
        usuario: uid, 
        ...req.body 
    });

    try {

        const hospitalDB = await hospital.save();

        res.status(200).json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salió mal...'
        })
    }

}

const actualizarHospital = ( req, res = response ) => {

    res.status(200).json({
        ok: true,
        msg: 'Actualizando hospitales'
    });

}

const borrarHospital = ( req, res = response ) => {

    res.status(200).json({
        ok: true,
        msg: 'Borrar hospitales'
    });

}


module.exports = { getHospitales, crearHospital, actualizarHospital, borrarHospital };



