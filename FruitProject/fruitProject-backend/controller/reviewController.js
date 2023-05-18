const express = require('express');
const router = express.Router();
const routeRoot = '/';
const url = require('url').URL;
const model = require("../models/reviewsModel");
const {InvalidInputError} = require("../models/InvalidInputError");
const {DatabaseError} = require('../models/DatabaseError');
const logger = require("../logger");
const {authenticateUser, refreshSession} = require("./sessionController");
const {Session, createSession, getSession, deleteSession} = require('./Session');

module.exports = {
    router,
    routeRoot
}
/**
 * Inserts review into database
 * sends added review as response when successful
 * otherwise sends error message
 * @param {*} request express request with json body with title, content and rating
 * @param {*} response express response 200 for successful, 400 for user error and 500 for server error
 * @throws {InvalidInputError} Thrown when user input is invalid.
 * @throws {DatabaseError} Thrown when error inserting into database occurs.
 */
router.post("/reviews", createReview);
async function createReview(request, response){
    body = request.body;
    try {
        const authenticatedSession = authenticateUser(request);
        if(!authenticatedSession){
        response.sendStatus(401);
        return;
        }
        let sessionId = refreshSession(request, response);
        result = await model.addReview(body.fruit,body.title, body.content, body.rating,body.user);

        responseString = "Review added: \n" + result.title + " " + result.content + " " + result.rating;
        logger.info(responseString);
        response.status(200);
        response.cookie("sessionId", sessionId, { expires: getSession(sessionId).expiresAt , httpsOnly: true, overwrite: true});
        response.send(result);
    } catch (error) {
        
        logger.error("Could not create review: " + body.title + 
        " " +  body.content +  " " +  body.rating + " -> " + error.message);
        if(error instanceof InvalidInputError){
            responseString = "Could not create review.\nInvalid input: please try again";
            response.status(400);
            response.send(responseString);
            
        }
        else if(error instanceof DatabaseError){
            responseString = "Server issues while creating review.\n Sorry for the inconvenience";
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
 * Retrieves single review from database.
 * sends retrieved review as response when successful
 * otherwise sends error message
 * @param {*} request express request with the title as parameter
 * @param {*} response express response 200 for successful, 400 for user error, 500 for server error
 * @throws {InvalidInputError} Thrown when user input is invalid.
 * @throws {DatabaseError} Thrown when error inserting into database occurs.
 */
router.get("/reviews/:title", getReview);
async function getReview(request, response){
    reviewTitle = request.params.title;
    try {
        const authenticatedSession = authenticateUser(request);
        if(!authenticatedSession){
        response.sendStatus(401);
        return;
        }
        let sessionId = refreshSession(request, response);
        result = await model.getSingleReview(reviewTitle);
        responseString = "Review found: " + result.title + " " + result.content + " " + result.rating;
        logger.info(responseString);
        response.status(200);
        response.cookie("sessionId", sessionId, { expires: getSession(sessionId).expiresAt , httpsOnly: true, overwrite: true });
        response.send(result);
    } catch (error) {
        logger.error(error.message);
        if(error instanceof InvalidInputError){
            responseString = "No review found.\nInvalid input: please try again";
            response.status(400);
            response.send(responseString);
            
        }
        else if(error instanceof DatabaseError){
            responseString = "Server issues while retrieving review.\n Sorry for the inconvenience";
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
 * Retrieves all reviews from database
 * sends all retrieved reviews as response when successful
 * otherwise sends error message
 * @param {*} request express request no input needed
 * @param {*} response express response 200 for successful, 400 for user error, 500 for server error
 * @throws {DatabaseError} Thrown when error inserting into database occurs.
 */
 
 router.get("/reviews", getReviews);
async function getReviews(request, response){
    try {
        const authenticatedSession = authenticateUser(request);
        if(!authenticatedSession){
        response.sendStatus(401);
        return;
        }
        let sessionId = refreshSession(request, response);
        result = await model.getAllReviews();
        responseString = "Reviews:\n";
        result.forEach(review => {
            responseString += "- " + review.title + " " + review.content + " " + review.rating + "\n";
        });
        logger.info(responseString);
        response.status(200);
        response.cookie("sessionId", sessionId, { expires: getSession(sessionId).expiresAt , httpsOnly: true, overwrite: true });
        response.send(result)
    } catch (error) {
        logger.error(error.message);
        if(error instanceof DatabaseError){
            responseString = "Server issues while retrieving review.\n Sorry for the inconvenience";
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

router.get("/reviews/fruits/:fruit", getFruitReviews);
async function getFruitReviews(request, response){
    fruit = request.params.fruit;
    try {
        const authenticatedSession = authenticateUser(request);
        if(!authenticatedSession){
        response.sendStatus(401);
        return;
        }
        let sessionId = refreshSession(request, response);
        result = await model.getAllFruitReviews(fruit);
        responseString = "Reviews:\n";
        result.forEach(review => {
            responseString += "- " + review.title + " " + review.content + " " + review.rating + "\n";
        });
        logger.info(responseString);
        response.status(200);
        response.cookie("sessionId", sessionId, { expires: getSession(sessionId).expiresAt , httpsOnly: true, overwrite: true });
        response.send(result)
    } catch (error) {
        logger.error(error.message);
        if(error instanceof DatabaseError){
            responseString = "Server issues while retrieving review.\n Sorry for the inconvenience";
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
 * updates single review in database
 * sends old and updated review as response when successful
 * otherwise sends error message
 * @param {*} request express request with json body of old review and new review
 * @param {*} response express response 200 for successful, 400 for user error, 500 for server error
 * @throws {InvalidInputError} Thrown when user input is invalid.
 * @throws {DatabaseError} Thrown when error inserting into database occurs.
 */
 router.put("/reviews", updateReview);
async function updateReview(request, response){
    body = request.body;
    try {
        const authenticatedSession = authenticateUser(request);
        if(!authenticatedSession){
        response.sendStatus(401);
        return;
        }
        let sessionId = refreshSession(request, response);
        result = await model.updateReview(body.oldTitle, body.oldContent, body.oldRating, body.newTitle, body.newContent, body.newRating);
        responseString = "Review: " + " " + body.oldTitle + " " + body.oldContent + " " + body.oldRating + " updated to\n" +
        body.newTitle + " " + body.newContent + " " + body.newRating;
        logger.info(responseString);
        response.status(200);
        response.cookie("sessionId", sessionId, { expires: getSession(sessionId).expiresAt , httpsOnly: true, overwrite: true });
        response.send(result);
    } catch (error) {
        logger.error(error.message);
        if(error instanceof InvalidInputError){
            responseString = "No review found to update.\nInvalid input: please try again";
            response.status(400);
            response.send(responseString);
        }
        else if(error instanceof DatabaseError){
            responseString = "Server issues while retrieving review.\n Sorry for the inconvenience";
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
 * Deletes review from database
 * sends deleted review as response when successful
 * otherwise sends error message
 * @param {*} request express request with title as parameter
 * @param {*} response express response 200 for successful, 400 for user error, 500 for server error
 * @throws {InvalidInputError} Thrown when user input is invalid.
 * @throws {DatabaseError} Thrown when error inserting into database occurs.
 */
router.delete("/reviews/:title", deleteReview);
async function deleteReview(request, response){
    reviewTitle = request.params.title;
    try {
        const authenticatedSession = authenticateUser(request);
        if(!authenticatedSession){
        response.sendStatus(401);
        return;
        }
        let sessionId = refreshSession(request, response);
        result = await model.deleteReview(reviewTitle);
        response.status(200);
        response.cookie("sessionId", sessionId, { expires: getSession(sessionId).expiresAt , httpsOnly: true, overwrite: true });
        responseString = "Review: " + reviewTitle + " deleted";
        logger.info(responseString);
        response.send(reviewTitle);
    } catch (error) {
        logger.error(error.message);
        if(error instanceof InvalidInputError){
            responseString = "No review found to delete.\nInvalid input: please try again";
            response.status(400);
            response.send(responseString);
        }
        else if(error instanceof DatabaseError){
            responseString = "Server issues while retrieving review.\n Sorry for the inconvenience";
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

