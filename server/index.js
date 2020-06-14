// Import express
const express = require('express');
const path = require('path');
const routes = require('./routes');
const configs = require('./config');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './server/variables.env' });

// start the app
const app = express();

//enable pug
app.set('view engine', 'pug');
// add the view
app.set('views', path.join(__dirname, './views'));

// load the static folder
app.use(express.static('public'));

const config = configs[app.get('env')];
app.locals.titulo = config.nombreSitio;

// show the current year and the route
app.use((req, res, next) => {
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;
    return next();
});

app.use(bodyParser.urlencoded({ extended: true }));

// load the routes
app.use('/', routes());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('server running');
});
