const express = require('express');
const ruta = express.Router();

const connection = require('../connection');

ruta.get('/:idSala', async (req, res) => {
    try {
        const query = 'SELECT * FROM asiento WHERE disponible = 0 AND idSala = ?';
        const asientos = await connection.query(query, [req.params.idSala]);

        res.send(asientos);
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

ruta.post('/editar_asiento/:idSala/:idAsiento', async (req, res) => {
    try {
        const query = 'UPDATE asiento SET disponible = 0 WHERE id_asiento = ? AND idSala = ?';
        await connection.query(query, [req.params.idAsiento, req.params.idSala]);
        res.json('Seat edited successfully')
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

module.exports = ruta;