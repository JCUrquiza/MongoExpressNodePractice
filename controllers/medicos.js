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

const actualizarMedicos = async ( req, res = response ) => {

    const id = req.params.id;
    const uid = req.uid;

    try{

        const medico = Medico.findById(id);

        if ( !medico ) {
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado en la BBDD'
            });
        }

        // hospital.nombre = req.body.nombre;
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        };

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true });

        res.status(200).json({
            ok: true,
            medicoActualizado
        });

    } catch (error) {

        console.log(error);

        res.status(404).json({
            ok: false,
            msg: 'Medico no encontrado'
        });

    }

}

const borrarMedicos = async ( req, res = response ) => {

    const id = req.params.id;

    try{

        const medico = Medico.findById(id);
        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró el médico'
            });
        }

        await Medico.findByIdAndDelete( id );

        res.status(200).json({
            ok: true,
            msg: 'Médico eliminado'
        });

    } catch ( error ) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Contacte con el admin'
        });

    }

}

module.exports = { getMedicos, crearMedicos, actualizarMedicos, borrarMedicos };


