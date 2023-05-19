const express = require('express');
const router = express.Router();
const routeRoot = '/';
const url = require('url').URL;
const model = require("../models/userModel");
const {InvalidInputError} = require("../models/InvalidInputError");
const {DatabaseError} = require('../models/DatabaseError');
const logger = require("../logger");
const {authenticateUser} = require("./sessionController");

module.exports = {
    router,
    routeRoot
}

/**
 * A controller that adds user to the database.
 * @param{*} request contain body with user's name, password and role
 * @param{*} response sends us 200 when added successfully, 400 on invalid inputs, 500 on database errors
 */
router.post("/users", createUser);
async function createUser(request, response){
    body = request.body;
    try {
        
        result = await model.addUser(body.username, body.password, body.role)

        responseString = "User added: \n" + result.username + " " + result.password + " " + result.role;
        logger.info(responseString);
        response.status(200);
        response.send(result);
    } catch (error) {
        logger.error("Could not create user: " + body.username + 
        " " +  body.password +  " " +  body.role + " -> " + error.message);
        if(error instanceof InvalidInputError){
            responseString = "Could not create user.\nInvalid input: please try again";
            response.status(400);
            response.send(responseString);
            
        }
        else if(error instanceof DatabaseError){
            responseString = "Server issues while creating user.\n Sorry for the inconvenience";
            response.status(500);
            response.send(responseString);
        }
        else{
            responseString = "A intern has messed up bad.\n Sorry for the inconvenience";
            response.status(500);
            response.send(responseString);
        }
    }
}

/**
 * A controller that finds user from the database.
 * @param{*} request contain parameter with user's name and password
 * @param{*} response sends us 200 when added successfully, 400 on invalid inputs, 500 on database errors
 */
router.get("/users/:username/:password", getUser);
async function getUser(request, response) {
    username = request.params.username
    password = request.params.password
    try {
        
        result = await model.getSingleUser(username, password);
        responseString = "User found: " + result.username + " " + result.password;
        logger.info(responseString);
        response.status(200);
        response.send(result);
    } catch (error) {
        logger.error(error.message);
        if(error instanceof InvalidInputError){
            responseString = "No user found.\nInvalid input: please try again";
            response.status(400);
            response.send({errorMessage: responseString});
            
        }
        else if(error instanceof DatabaseError){
            responseString = "Server issues while retrieving user.\n Sorry for the inconvenience";
            response.status(500);
            response.send(responseString);
            
        }
        else{
            responseString = "A intern has messed up bad.\n Sorry for the inconvenience";
            response.status(500);
            response.send(responseString);
        }
    }
}

/**
 * A controller that finds user from the database.
 * @param{*} request contain parameter with user's name
 * @param{*} response sends us 200 when added successfully, 400 on invalid inputs, 500 on database errors
 */
router.get("/users/:name", getUserFromSession);
async function getUserFromSession(request, response) {
    try {
        
        user = await model.getSingleUserByName(request.params.name);
        response.status(200);
        response.send(user);
    } catch (error) {
        logger.error(error.message);
        if(error instanceof InvalidInputError){
            responseString = "No user found.\nInvalid input: please try again";
            response.status(400);
            response.send({errorMessage: responseString});
            
        }
        else if(error instanceof DatabaseError){
            responseString = "Server issues while retrieving user.\n Sorry for the inconvenience";
            response.status(500);
            response.send(responseString);
            
        }
        else{
            responseString = "A intern has messed up bad.\n Sorry for the inconvenience";
            response.status(500);
            response.send(responseString);
        }
    }
}


/**
 * A controller that finds all user from the database.
 * @param{*} request is not being use, only to call the function
 * @param{*} response sends us 200 when added successfully, 500 on database errors
 */
router.get("/users", getUsers);
async function getUsers(request, response){
    try {
        
        result = await model.getAllUsers();
        response.status(200)
        response.send(result)
    } catch (error) {
        logger.error(error.message);
        if(error instanceof DatabaseError){
            responseString = "Server issues while retrieving users.\n Sorry for the inconvenience";
            response.status(500);
            response.send(responseString);
            
        }
        else{
            responseString = "A intern has messed up bad.\n Sorry for the inconvenience";
            response.status(500);
            response.send(responseString);
        }
    }
}

/**
 * A controller that updates user in the database.
 * @param{*} request contain body with old user's name, passwords, roles and the new ones
 * @param{*} response sends us 200 when added successfully, 400 on invalid inputs, 500 on database errors
 */
router.put("/users", updateUser);
async function updateUser(request, response){
    body = request.body;
    try {
        const authenticatedSession = authenticateUser(request);
        if(!authenticatedSession){
        response.sendStatus(401);
        return;
        }
        await model.updateUser(body.oUsername, body.oPassword, body.oRole, body.nUsername, body.nPassword, body.nRole);
        response.status(200)
        response.send({username: body.nUsername, password: body.nPassword, role: body.nRole})

    } catch (error) {
        logger.error(error.message);
        if(error instanceof InvalidInputError){
            responseString = "No user found to update.\nInvalid input: please try again";
            response.status(400);
            response.send(responseString);
        }
        else if(error instanceof DatabaseError){
            responseString = "Server issues while retrieving user.\n Sorry for the inconvenience";
            response.status(500);
            response.send(responseString);
        }
        else{
            responseString = "A intern has messed up bad.\n Sorry for the inconvenience";
            response.status(500);
            response.send(responseString);
        }
    }
}

/**
 * A controller that deletes user to the database.
 * @param{*} request contain body with user's name and password
 * @param{*} response sends us 200 when added successfully, 400 on invalid inputs, 500 on database errors
 */
router.delete("/users/:userName/:password", deleteUser);
async function deleteUser(request, response) {
    userName = request.params.userName
    password = request.params.password
    try {
        const authenticatedSession = authenticateUser(request);
        if(!authenticatedSession){
        response.sendStatus(401);
        return;
        }
        result = await model.deleteUser(userName, password);
        response.status(200);
        response.send(result)
    } catch (error) {
        logger.error(error.message);
        if(error instanceof InvalidInputError){
            responseString = "No user found to delete.\nInvalid input: please try again";
            response.status(400);
            response.send(responseString);
        }
        else if(error instanceof DatabaseError){
            responseString = "Server issues while retrieving user.\n Sorry for the inconvenience";
            response.status(500);
            response.send(responseString);
        }
        else{
            responseString = "A intern has messed up bad.\n Sorry for the inconvenience";
            response.status(500);
            response.send(responseString);
        }

    }
}