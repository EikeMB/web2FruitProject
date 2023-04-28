const express = require('express');
const router = express.Router();
const routeRoot = '/';


/** Controller function welcome the user
 * 
 * @param {*} request Expect query parameters of firstName and lastName
 * @param {*} response Hello message (200 success).
 */
 router.get("/", welcome); // Define endpoint
 function welcome(request, response) {
   const output = "Welcome to Fruit website"
   response.send(output);
 }


module.exports = {welcome, router,routeRoot}
