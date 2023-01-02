const express = require('express');
//Inicializar app
const app = express();

const http = require('http');

//Crear servidor inicializando app
const server = http.createServer(app);

const logger = require('morgan');
const cors = require('cors');

const passport = require('passport');
/*
* IMPORTAR RUTAS 
*/
const usersRoutes = require('./routes/user_routes');

//Puerto local
const PORT = process.env.PORT|| 3000;
//Debug los futuros errores del server

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by');

//Definir el puerto 
app.set('port', PORT);

//Llamado de las rutas
usersRoutes(app);

// Tambien se puede hacer con app.listen()
app.listen(process.env.PORT || 3000, ()=>{
    const port = process.env.PORT || 3000;
    console.log(`Servidor corriendo en el puerto ${port}`);
});

app.get('/', (req,res)=> {
    res.send('Ruta Inicial Confirmada');
});

app.get('/test', (req,res)=> {
    res.send('Ruta Test Confirmada');
});

// error handler
 
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app, 
    server: server 
}

//200 - Respuesta exitosa
//404 - Error en la peticion
//500 - Error interno del servidor
//304 - No hay modificacion de la ultima vez iniciado el servidor
