const { response } = require('express');
const jwt = require('jsonwebtoken');


const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res= response, next ) => {

    // x-token headers
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {

        const { uid, name} = jwt.verify(token, process.env.SECRET_JWT_SEED);

        const usuario = await Usuario.findById( uid );

       req.uid = uid;
       req.name = name;
       next();

        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

   
}


module.exports = {
    validarJWT
}