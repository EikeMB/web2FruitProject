const bodyParser = require("body-parser");
const cors = require("cors");
const express = require('express');
const app = express();

const logger = require('./logger');
const pinohttp = require('pino-http');
const httpLogger = pinohttp({logger: logger});
app.use(httpLogger);


const listEndpoints = require('express-list-endpoints');


console.log(listEndpoints(app))

// Make sure errorController is last!
const controllers = ['homeController', 'fruitController', 'errorController'] 

app.use(cors());
app.use(express.json());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.json());

// Register routes from all controllers 
// (Assumes a flat directory structure and common 
// 'routeRoot' / 'router' export)
controllers.forEach((controllerName) => {
    try {
        const controllerRoutes = require ('./controller/' + controllerName);
        app.use(controllerRoutes.routeRoot, controllerRoutes.router);

    } catch (error) {
        console.log(error);
       throw error; // We could fail gracefully, but this would hide bugs later on.

    } 
})


module.exports = app
