const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ruta = express.Router();

const connection = require('../connection');

ruta.get('/:email', async (req, res) => {
    try {
        const query = 'SELECT * FROM administrador WHERE email = ?';
        const admin = await connection.query(query, [req.params.email]);

        res.send(admin);
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

ruta.post('/login', async (req, res) => {
    try {
        const body = req.body;
        const query = 'SELECT * FROM administrador WHERE email = ?';
        const admin = await connection.query(query, [body.email]);

        if (admin.length > 0) {
            admin.forEach(element => {
                bcrypt.compare(body.passcode, element.passcode, (err, isMatch) => {
                    if (isMatch) {
                        
                        // Creación del token:
                        const token = jwt.sign({
                            nombre: element.nombre,
                            email: element.email
                        }, process.env.TOKEN_SECRET);

                        res.header('auth-token', token).json({
                            error: null,
                            data: {token}
                        });
                        
                    } else {
                        res.status(400).json({
                            success: false,
                            message: 'Contraseña incorrecta'
                        });
                    }
                  });
            });
            
        } else if (body.email === '' || body.passcode === '') {
            res.status(400).json({
                success: false,
                message: 'Campos vacíos'
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Dicho usuario no existe'
            });
        }
    } catch (error) {
        return res.json({
            error: error
        });
    }
});


ruta.post('/registro', (req, res) => {
    try {
        const body = req.body;
        bcrypt.hash(body.passcode, 12)
            .then (hash => {
                body.passcode = hash;

                const query = 'INSERT INTO administrador (nombre, email, passcode) VALUES (?, ?, ?)';
                connection.query(query, [body.nombre, body.email, body.passcode]);
                
                res.json('Admin added successfully');
            });
    } catch (error) {
        return res.json({
            error: error
        });
    }
});


module.exports = ruta;