const express = require('express');
const ruta = express.Router();

const connection = require('../connection');

ruta.get('/:id', async (req, res) => {
    try {
        const query = 'SELECT * FROM funcion WHERE id_funcion = ?';
        const funcion = await connection.query(query, [req.params.id]);

        res.send(funcion);
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

ruta.get('/pelicula/:id', async (req, res) => {
    try {
        const query = 'SELECT * FROM funcion WHERE idPelicula = ?';
        const funciones = await connection.query(query, [req.params.id]);

        res.send(funciones);
    } catch (error) {
        return res.json({
            error: error
        });
    }
});



ruta.get('/sub/:id/:fecha', async (req, res) => {
    try {
        const query = "SELECT * FROM funcion WHERE idPelicula = ? AND fecha = ? AND formato = 'Subtitulada'";
        const funciones = await connection.query(query, [req.params.id, req.params.fecha]);

        res.send(funciones);
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

ruta.get('/es/:id/:fecha', async (req, res) => {
    try {
        const query = "SELECT * FROM funcion WHERE idPelicula = ? AND fecha = ? AND formato = 'Español'";
        const funciones = await connection.query(query, [req.params.id, req.params.fecha]);

        res.send(funciones);
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

ruta.post('/nueva_funcion', async (req, res) => {
    try {
        const body = req.body;
        const query = 'INSERT INTO funcion (fecha, hora, formato, idPelicula, idSala) VALUES (?, ?, ?, ?, ?)';
        await connection.query(query, [body.fecha, body.hora, body.formato, body.idPelicula, body.idSala]);
        
        res.json('Function added successfully')
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

ruta.post('/eliminar_funcion', async (req, res) => {
    try {
        const id_funcion = req.body.id_funcion;
        const query = 'DELETE FROM funcion WHERE id_funcion = ?';
        await connection.query(query, [id_funcion]);

        res.json('Function deleted succesfully');
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

ruta.post('/editar_funcion', async (req, res) => {
    try {
        const body = req.body;
        const query = 'UPDATE funcion SET fecha = ?, hora = ?, formato = ?, idPelicula = ?, idSala = ? WHERE id_funcion = ?';
        await connection.query(query, [body.fecha, body.hora, body.formato, body.idPelicula, body.idSala, body.id_funcion]);
        res.json('Function edited successfully')
    } catch (error) {
        return res.json({
            error: error
        });
    }
});


module.exports = ruta;