const express = require('express');
const ruta = express.Router();

const connection = require('../connection');

ruta.get('/:idCompra', async (req, res) => {
    try {
        const query = 'SELECT * FROM boleto WHERE idCompra = ?';
        const boletos = await connection.query(query, [req.params.idCompra]);
        res.send(boletos);
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

ruta.post('/nuevo_boleto',  (req, res) => {
    try {
        const body = req.body;
        const query = 'INSERT INTO boleto (precio, idFuncion, idAsiento, idCompra) VALUES (70, ?, ?, ?)';
        body.idAsientos.forEach(async (element) => {
            await connection.query(query, [body.idFuncion, element, body.idCompra]);
        });
        res.json('Ticket added successfully')
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

module.exports = ruta;