const { response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


const getTodo = async (req, res = response) => {

    // Obtener parámetros de URL
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );
    
    /* const usuarios = await Usuario.find({ nombre: regex });
    const medicos = await Medico.find({ nombre: regex });
    const hospitales = await Hospital.find({ nombre: regex }); */

    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);
    
    res.status(200).json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });

}

const getDocumentosColeccion = async (req, res = response) => {

    // Obtener parámetros de URL
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    let data = [];

    switch(tabla) {
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
        break;
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
        break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre img');
        break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla espesificada no existe'
             });

    }

    res.json({
        ok: true,
        resultados: data
    });

    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);
    
    res.status(200).json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });

}

module.exports = { getTodo, getDocumentosColeccion };

