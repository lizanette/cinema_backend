const express = require('express');
const ruta = express.Router();

const connection = require('../connection');

ruta.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM sala';
        const salas = await connection.query(query);

        res.send(salas);
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

module.exports = ruta;