const express = require('express');
const cors = require('cors');
const {mongoose} = require('./database');
var app = express();
//middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Agrega los métodos que necesites
    }));
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
    const bodyParser = require('body-parser');

// Configurar límite de carga útil
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
//Cargamos el modulo de direccionamiento de rutas
app.use('/api/agente', require('./src/routes/agente.route'));
app.use('/api/producto', require('./src/routes/producto.route'));
app.use('/api/espectador', require('./src/routes/espectador.route'));
app.use('/api/ticket', require('./src/routes/ticket.route'));
app.use('api/transaccion',require('./src/routes/transaccion.route'));
//setting
app.set('port', process.env.PORT || 3000);
//starting the server
app.listen(app.get('port'), () => {
console.log(`Server started on port`, app.get('port'));
});
