const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
        // Si hay un error al decodificar el token o no existe
        if (error){
            return res.status(401).json({
                 mensaje: 'Acceso denegado',
                 error
            })
       }

       // Creamos una nueva propiedad en el req
       console.log(decoded)
       //req.user = decoded.usuario
       // console.log(decoded.usuario.nue)
       next()
    })

};

module.exports = verifyToken;