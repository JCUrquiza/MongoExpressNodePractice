const { response, json } = require('express');
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

const actualizarHospital = async ( req, res = response ) => {

    const id = req.params.id;
    const uid = req.uid;

    try{

        const hospital = await Hospital.findById( id );

        if ( !hospital ) {
            return res.status(404).json({
                ok: true,
                msg: 'Ese hospital no existe'
            });
        }

        // hospital.nombre = req.body.nombre;
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        };

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, {new: true});

        res.status(200).json({
            ok: true,
            msg: 'Actualizando hospitales',
            hospitalActualizado
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });

    }

}

const borrarHospital = async ( req, res = response ) => {

    const id = req.params.id;
    
    try{

        const hospital = Hospital.findById( id );

        if ( !hospital ) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado en la BBDD'
            });
        }

        await Hospital.findByIdAndDelete( id );

        res.status(200).json({
            ok: true,
            msg: 'Hospital eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(200).json({
            ok: true,
            msg: 'Borrar hospitales'
        });

    }

}


module.exports = { getHospitales, crearHospital, actualizarHospital, borrarHospital };



