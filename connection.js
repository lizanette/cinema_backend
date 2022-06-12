const mysql = require('mysql');
const { promisify } = require('util'); // promisify es un módulo que sirve para manejar las promesas
// Una promesa es una función asíncrona

// Configurar la conexión a la base de datos
const connection = mysql.createPool({
    host: 'localhost',
    user: 'userRoot',
    password: 'L101200l',
    database: 'cinema_db'
});

connection.getConnection(
    (err, conn) => {
        if (err) {
            console.log('Problemas para conectar a la db' + err);
        }
        if (conn) {
            conn.release();
            console.log('¡DB conectada!');
        }
        return
    }
);

connection.query = promisify(connection.query);

module.exports = connection;