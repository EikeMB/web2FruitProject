const { MongoClient } = require('mongodb');
const validateUtils = require('./validateUtils');
const {InvalidInputError} = require('./InvalidInputError');
const {DatabaseError} = require('./DatabaseError');
const validator = require('validator');
const logger = require("../logger");

let client;
let userCollection;

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
        collectionCursor = await db.listCollections({name: "users"});
        collectionArray = await collectionCursor.toArray();
        if(collectionArray.length > 0 && resetFlag){
            await db.collection("users").drop();
            const collation = { locale: "en", strength: 1 };
            await db.createCollection("users", {collation: collation});
        }
        else if(collectionArray.length == 0){
            const collation = { locale: "en", strength: 1 };
            await db.createCollection("users", {collation: collation});
        }
        userCollection = await db.collection("users");
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
    return user;
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
 * add a new user to the users database
 * use validation to check if the name, password and role are valid
 * @param {*} username 
 * @param {*} password 
 * @param {*} role 
 * @returns user object
 * @throws {DatabaseError} will throw when cannot upload user to database
 * @throws {InvalidInputError} will throw if the user's parameters are invalid
 */
async function addUser(username, password, role){
    try {
        if(validateUtils.isValidUser(password, role)){
            if(client.s.hasBeenClosed){
                throw new DatabaseError("No connection to the database")
            }
            user = {username : username, password : password, role : role}
            try {
                await userCollection.insertOne(user)
                logger.info("Inserted user: " + user)
            } catch (error) {
                logger.error("Failed to insert user: " + error.message + ": " + user)
                throw new DatabaseError("Error inserting user: " + error.message);
            }
            return user;
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
 * find a user by name in databse
 * @param {string} userame 
 * @returns user object
 * @throws {DatabaseError} will throw when cannot try to find user in database
 * @throws {InvalidInputError} will throw if the user's name is invalid or cannot find in database
 */
async function getSingleUserByName(username){
    try{
    
            if(client.s.hasBeenClosed){
                throw new DatabaseError("No connection to the database")
            }
            result = await userCollection.findOne({username: username})
            if(result == null){
                logger.info(username + " user not found")
                throw new InvalidInputError("No such user " + username)
            }
            logger.info(username + " user found")
            return result
        
    } catch(error){
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
 * find a user by name and password in databse
 * @param {string} userame 
 * @param {string} password 
 * @returns user object
 * @throws {DatabaseError} will throw when cannot try to find user in database
 * @throws {InvalidInputError} will throw if the user's name is invalid or cannot find in database
 */
async function getSingleUser(username, password){
    try{
        if(validateUtils.isValidUser(password, "user")){
            if(client.s.hasBeenClosed){
                throw new DatabaseError("No connection to the database")
            }
            result = await userCollection.findOne({username: username, password: password})
            if(result == null){
                logger.info(username + " user not found")
                throw new InvalidInputError("No such user " + username)
            }
            logger.info(username + " user found")
            return result
        }
    } catch(error){
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
 * get all user from the database 
 * @returns all user in the database
 * @throws {DatabaseError} will throw when cannot try to find all user in database
 */
async function getAllUsers(){
    try {
        if(client.s.hasBeenClosed){
            throw new DatabaseError("No connection to the database")
        }
        result = await userCollection.find();
        logger.info("All users found")
        return result.toArray()
    } catch (error) {
        logger.error(error);
        throw new DatabaseError("Error retrieving all users from database: " + error.message)
    }
}

/**
 * update a user in the database
 * validate if the the new given name, password and role are valid
 * it use isValidUser to verify if user input is valid
 * If the mondgod update return null then it assume that the old name is invalid
 * 
 * @param {*} oUsername old user name
 * @param {*} oPassword old password name
 * @param {*} oRole old role name
 * @param {*} nUsername new user name
 * @param {*} nPassword new password name
 * @param {*} nRole new role name
 * 
 * @throws {DatabaseError} will throw when cannot try to update fruit in database
 * @throws {InvalidInputError} will throw if the fruit's name is invalid or cannot update fruit in database because doesn't exist
 */
async function updateUser(oUsername, oPassword, oRole, nUsername, nPassword, nRole){
    try {
        if(validateUtils.isValidUser(oPassword, oRole) && validateUtils.isValidUser(nPassword, nRole)){
            if(client.s.hasBeenClosed){
                throw new DatabaseError("No connection to database");
            }
            result = await userCollection.updateOne({username: oUsername, password: oPassword, role: oRole},
                {$set: {username: nUsername, password: nPassword, role: nRole}});
            if(result.modifiedCount == 0){
                throw new InvalidInputError("User " + oUsername + " not found");
            }
            logger.info("Succesful update");
        }
    } catch (error) {
        if(error instanceof DatabaseError) {
            logger.error(error);
            throw new DatabaseError("Error updating user from database: " + error.message);
        }
        else if(error instanceof InvalidInputError){
            logger.error(error);
            throw error;
        }
        
    }
}

/**
 * delete a user from the database
 * @param {String} name 
 * @param {String} password 
 * @throws {DatabaseError} will throw when cannot try to delete fruit in database
 * @throws {InvalidInputError} will throw if the fruit's name is invalid or cannot delete in database because doesn't exit
 */
async function deleteUser(username, password){
    try {
        if(client.s.hasBeenClosed){
            throw new DatabaseError("No connection to database");
        }
        result = await userCollection.deleteOne({username: username, password: password});
        if(result.deletedCount > 0){
            logger.info("Deleted " + username)
            return username;
        }
        else{
            logger.info("Could not delete -> " + username + " not found")
            throw new InvalidInputError("User " + username + " not found");
        }
        
    } catch (error) {
        if(error instanceof DatabaseError) {
            logger.error(error);
            throw new DatabaseError("Error updating user from database: " + error.message);
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

module.exports = {initialize, addUser, getSingleUser, getSingleUserByName,getAllUsers, updateUser, deleteUser, close, getCollection}