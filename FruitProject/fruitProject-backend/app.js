const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST,PUT, DELETE, OPTIONS, HEAD, PATCH");
    next();
})
app.use(cookieParser());

const logger = require('./logger');
const pinohttp = require('pino-http');
const httpLogger = pinohttp({logger: logger});
app.use(httpLogger);


const listEndpoints = require('express-list-endpoints');


console.log(listEndpoints(app))

// Make sure errorController is last!
const controllers = ['homeController', 'fruitController', 'userController', 'sessionController','reviewController', 'errorController'] 

app.use(express.json());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
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
