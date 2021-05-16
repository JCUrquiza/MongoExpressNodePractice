const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try{

        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        // Verificar contraseña
        const validPassword = bcryptjs.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        // Generar token - JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token
        })

    } catch ( error ) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }   

}

const googleSignIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try{

        const { name, email, picture } = await googleVerify(googleToken);

        // Verificar si existe usuario con email
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if ( !usuarioDB ) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en BBDD
        await usuario.save();

        // Generar JWT:
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            token
        });

    } catch (error) {

        res.status(401).json({
            ok: false,
            msg: 'El Token no es correcto'
        });

    }

}


module.exports = { login, googleSignIn };

