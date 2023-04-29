const { MongoClient } = require('mongodb');
const validateUtils = require('./validateUtils');
const {InvalidInputError} = require('./InvalidInputError');
const {DatabaseError} = require('./DatabaseError');
const validator = require('validator');
const logger = require("../logger");

let client;
let reviewCollection;

/**
 * function to initialize and connect to the mongodb database.
 * @param {string} databaseName The name of the database.
 * @param {boolean} resetFlag if set to true reset the database otherwise connect normally.
 * @param {string} URL of the database to connect to.
 * @throws {DatabaseError} Thrown when error connecting to database occurs.
 */
async function initialize(databaseName, resetFlag = false, URL){
    try {
        client = new MongoClient(URL);
        await client.connect();
        logger.info("Connected to MongoDb");
        db = client.db(databaseName);
        collectionCursor = await db.listCollections({name: "reviews"});
        collectionArray = await collectionCursor.toArray();
        if(collectionArray.length > 0 && resetFlag){
            await db.collection("reviews").drop();
            const collation = { locale: "en", strength: 1 };
            await db.createCollection("reviews", {collation: collation});
        }
        else if(collectionArray.length == 0){
            const collation = { locale: "en", strength: 1 };
            await db.createCollection("reviews", {collation: collation});
        }
        reviewCollection = await db.collection("reviews");
    } catch (error) {
        logger.error(error);
        throw new DatabaseError("Error connecting to database: " + error.message);
    }
}

/**
 * function to retrieve the collection.
 * @returns the collection of reviews.
 */
async function getCollection(){
    return reviewCollection;
}

/**
 * function to close the mongodb connection.
 * @throws {DatabaseError} Thrown when error closing the database occurs.
 */
async function close(){
    try {
        await client.close();
        logger.info("MongoDb connection closed");
    } catch (error) {
        logger.error(error);
        throw new DatabaseError("Error closing database: " + error.message);
    }
}

/**
 * function to add a new review to the database.
 * @param {string} title of the review to add.
 * @param {string} content of the review to add.
 * @param {Int16Array} rating of the review to add between 0 and 5.
 * @returns the added review.
 * @throws {InvalidInputError} Thrown when user input is invalid.
 * @throws {DatabaseError} Thrown when error inserting into database occurs.
 */
async function addReview(title, content, rating){
    try {
        if(validateUtils.isValidReview(title, content, rating)){
            if(client.s.hasBeenClosed){
                throw new DatabaseError("No connection to database");
            }
            review = {title: title, content: content, rating: rating}
            try {
                await reviewCollection.insertOne(review);
                logger.info("Inserted review into database:\n" + review);
            } catch (error) {
                logger.error("Failed to insert into database:\n" + error.message + "\n" + review);
                throw new DatabaseError("Error inserting review into database: " + error.message);
            }
            return review;
        }
    } catch (error) {
        if(error instanceof InvalidInputError){
            logger.error(error);
            throw error;
        }
        else if(error instanceof DatabaseError){
            throw error;
        }
        else{
            logger.error(error);
            throw error;
        }
    }
}

/**
 * function to retrieve one review from the database.
 * @param {string} title of the review to retrieve.
 * @returns the review if found.
 * @throws {InvalidInputError} Thrown when user input is invalid.
 * @throws {DatabaseError} Thrown when error finding from database occurs.
 */
async function getSingleReview(title){
    try {
        if(validator.isAscii(title)){
            if(client.s.hasBeenClosed){
                throw new DatabaseError("No connection to database");
            }
            result = await reviewCollection.findOne({title: title});
            if(result == null){
                logger.info(title + " review not found");
                throw new InvalidInputError("No such review found: " + title);
            }
            logger.info(title + " review found");
            return result;
        }
        else{
            logger.error(title + " is invalid");
            throw new InvalidInputError("Invalid title: " + title);
        }
    } catch (error) {
        if(error instanceof InvalidInputError){
            throw error;
        }
        else{
            logger.error(error);
            throw new DatabaseError("Error getting review from database: " + error.message);
        }
        
    }
}

/**
 * function to retrieve all reviews from the database.
 * @returns all found reviews.
 * @throws {DatabaseError} Thrown when error finding from database occurs.
 */
async function getAllReviews(){
    try {
        if(client.s.hasBeenClosed){
            throw new DatabaseError("No connection to database");
        }
        result = await reviewCollection.find();
        logger.info("All reviews found");
        return result.toArray();
    } catch (error) {
        logger.error(error);
        throw new DatabaseError("Error retrieving all reviews from database: " + error.message)
    }
}

/**
 * function to update specific review in the database.
 * @param {string} oTitle old title of the review to be updated.
 * @param {string} oContent old content of the review to be updated. 
 * @param {string} oRating old rating of the review to be updated.
 * @param {string} nTitle new title of the review to be updated.
 * @param {string} nContent new content of the review to be updated. 
 * @param {string} nRating new rating of the review to be updated.
 * @throws {InvalidInputError} Thrown when user input is invalid.
 * @throws {DatabaseError} Thrown when error updating database occurs.
 */
async function updateReview(oTitle, oContent, oRating, nTitle, nContent, nRating){
    try {
        if(validateUtils.isValidReview(oTitle, oContent, oRating) && validateUtils.isValidReview(nTitle, nContent, nRating)){
            if(client.s.hasBeenClosed){
                throw new DatabaseError("No connection to database");
            }
            result = await reviewCollection.updateOne({title: oTitle, content: oContent, rating: oRating},
                {$set: {title: nTitle, content: nContent, rating: nRating}});
            if(result.modifiedCount == 0){
                throw new InvalidInputError("Review " + oTitle + " not found");
            }
            logger.info("Succesful update");
            return {title: nTitle, content: nContent, rating: nRating}
        }
    } catch (error) {
        if(error instanceof DatabaseError) {
            logger.error(error);
            throw new DatabaseError("Error updating review from database: " + error.message);
        }
        else if(error instanceof InvalidInputError){
            logger.error(error);
            throw error;
        }
        
    }
}

/**
 * function to delete a specific review from the database.
 * @param {string} title of the review to be deleted.
 * @returns True if item was deleted, false otherwise.
 * @throws {DatabaseError} Thrown when error deleting from database occurs.
 */
async function deleteReview(title){
    try {
        if(client.s.hasBeenClosed){
            throw new DatabaseError("No connection to database");
        }
        result = await reviewCollection.deleteOne({title: title});
        if(result.deletedCount > 0){
            logger.info("Deleted " + title)
            return title;
        }
        else{
            logger.info("Could not delete -> " + title + " not found")
            throw new InvalidInputError("Review " + title + " not found");
        }
        
    } catch (error) {
        if(error instanceof DatabaseError) {
            logger.error(error);
            throw new DatabaseError("Error updating review from database: " + error.message);
        }
        else if(error instanceof InvalidInputError){
            logger.error(error);
            throw new InvalidInputError(error.message);
        }
        else{
            throw new DatabaseError("Unexpected error deleting from database: " + error.message);
        }
    }
}


module.exports = {initialize, addReview, getSingleReview, getAllReviews, updateReview, deleteReview, close, getCollection};