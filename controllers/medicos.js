const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async ( req, res = response ) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre')
        .populate('hospital', 'nombre');

    res.status(200).json({
        ok: true,
        medicos
    });

}

const crearMedicos = async ( req, res = response ) => {

    // Obtener el id del usuario (lo tenemos en request)
    const uid = req.uid;

    // const hospitalMedico = Medico.findById(uid);

    const medico = new Medico({
        usuario: uid, 
        ...req.body
    });

    try{

        const medicoDB = await medico.save();

        res.status(200).json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo ocurrió...'
        });
    }

}

const actualizarMedicos = ( req, res = response ) => {

    res.status(200).json({
        ok: true,
        msg: 'Actualizar medicos'
    });

}

const borrarMedicos = ( req, res = response ) => {

    res.status(200).json({
        ok: true,
        msg: 'Borrar medicos'
    });

}

module.exports = { getMedicos, crearMedicos, actualizarMedicos, borrarMedicos };


