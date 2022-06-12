const express = require('express');
const ruta = express.Router();

const connection = require('../connection');

ruta.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM compra';
        const compras = await connection.query(query);

        res.send(compras);
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

ruta.get('/:id', async (req, res) => {
    try {
        const query = 'SELECT * FROM compra WHERE id_compra = ?';
        const compra = await connection.query(query, [req.params.id]);

        res.send(compra);
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

ruta.post('/nueva_compra', async (req, res) => {
    try {
        const body = req.body;
        const query = 'INSERT INTO compra (num_boletos, costoTotal) VALUES (?, ?)';
        const response = await connection.query(query, [body.num_boletos, body.costoTotal]);
        let id = response.insertId;
        const query2 = 'SELECT * FROM compra WHERE id_compra = ?';
        const compra = await connection.query(query2, [id]);
        
        res.send(compra)
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

ruta.get('/ventas/:fecha', async (req, res) => {
    try {
        const query = 'SELECT * FROM compra WHERE DATE(fechaHora) = ?';
        const compras = await connection.query(query, [req.params.fecha]);
        res.send(compras);
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

ruta.get('/ventas/hora/:fecha', async (req, res) => {
    try {
        const query = 'SELECT TIME(fechaHora) AS hora FROM compra WHERE DATE(fechaHora) = ?';
        const horas = await connection.query(query, [req.params.fecha]);

        res.send(horas);
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

ruta.get('/ventas/total/:fecha', async (req, res) => {
    try {
        const query = 'SELECT SUM(costoTotal) AS suma FROM compra WHERE DATE(fechaHora) = ?';
        const total = await connection.query(query, [req.params.fecha]);

        res.send(total[0]);
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

module.exports = ruta;
