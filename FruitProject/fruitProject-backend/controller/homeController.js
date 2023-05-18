const express = require('express');
const router = express.Router();
const routeRoot = '/';
const {authenticateUser, refreshSession} = require('./sessionController')
const {Session, createSession, getSession, deleteSession} = require('./Session');


/** Controller function welcome the user
 * 
 * @param {*} request Expect query parameters of firstName and lastName
 * @param {*} response Hello message (200 success).
 */
 router.get("/", welcome); // Define endpoint
 function welcome(request, response) {
   const sessionId = refreshSession(request, response);
   
   const output = "Welcome to Fruit website"
   
   response.cookie("sessionId", sessionId, {expires: getSession(sessionId).expiresAt, httpOnly: true});
   response.send(output);
 }


module.exports = {welcome, router,routeRoot}
