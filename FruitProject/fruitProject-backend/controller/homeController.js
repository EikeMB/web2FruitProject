const express = require('express');
const router = express.Router();
const routeRoot = '/';
const {authenticateUser, refreshSession} = require('./sessionController')


/** Controller function welcome the user
 * 
 * @param {*} request Expect query parameters of firstName and lastName
 * @param {*} response Hello message (200 success).
 */
 router.get("/", welcome); // Define endpoint
 function welcome(request, response) {
   const authenticatedSession = authenticateUser(request);
   if(!authenticatedSession){
    response.sendStatus(401);
    return;
   }
   const output = "Welcome to Fruit website"
   refreshSession(request, response);
   response.send(output);
 }


module.exports = {welcome, router,routeRoot}
