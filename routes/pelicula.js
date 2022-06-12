const express = require('express');
const multer = require('multer');
var fs = require('fs');
const ruta = express.Router();

const connection = require('../connection');

const imgConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/');
    },
    filename: function (request, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage: imgConfig});

ruta.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM pelicula';
        const peliculas = await connection.query(query);

        res.send(peliculas);
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

ruta.get('/:id', async (req, res) => {
    try {
        const query = 'SELECT * FROM pelicula WHERE id_pelicula = ?';
        const pelicula = await connection.query(query, [req.params.id]);

        res.send(pelicula);
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

ruta.post('/subir_imagen', upload.single("image"), (req, res) => {
    res.json({
        image: req.file
    });
});

ruta.post('/nueva_pelicula', async (req, res) => {
    try {
        const body = req.body;
        const query = 'INSERT INTO pelicula (nombre, duracion, anio, sinopsis, genero, clasificacion, director, imagen, trailer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        await connection.query(query, [body.nombre, body.duracion, body.anio, body.sinopsis, body.genero, body.clasificacion, body.director, body.imagen, body.trailer]);
        
        res.json('Movie added successfully')
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

ruta.post('/eliminar_pelicula', async (req, res) => {
    try {
        const id_pelicula = req.body.id_pelicula;
        const img = "uploads/" + req.body.imagen;
        const query = 'DELETE FROM pelicula WHERE id_pelicula = ?';
        await connection.query(query, [id_pelicula]);

        if (fs.existsSync(img)) {
            fs.unlinkSync(img);
        }
        res.json('Movie deleted succesfully');
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

ruta.post('/editar_pelicula', async (req, res) => {
    try {
        const body = req.body;
        const query = 'UPDATE pelicula SET nombre = ?, duracion = ?, anio = ?, sinopsis = ?, genero = ?, clasificacion = ?, director = ?, trailer = ? WHERE id_pelicula = ?';
        await connection.query(query, [body.nombre, body.duracion, body.anio, body.sinopsis, body.genero, body.clasificacion, body.director, body.trailer, body.id_pelicula])
        res.json('Movie edited successfully')
    } catch (error) {
        return res.json({
            error: error
        });
    }
});

module.exports = ruta;