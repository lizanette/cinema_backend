const express = require('express'); // importa express
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // Se le dice a express que use este middleware
app.use(express.urlencoded({extended: true}));


app.use('/peliculas', require('./routes/pelicula'));
app.use('/funciones', require('./routes/funcion'));
app.use('/salas', require('./routes/sala'));
app.use('/admin', require('./routes/admin'));
app.use('/asientos', require('./routes/asiento'));
app.use('/compras', require('./routes/compra'));
app.use('/boletos', require('./routes/boleto'));


app.get('/', (req, res) => {
    res.send("I hope this works, please God");
});

process.env.TOKEN_SECRET = 'cinemaSecret';

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}.`);
});