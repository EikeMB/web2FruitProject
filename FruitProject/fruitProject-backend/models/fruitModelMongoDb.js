const { MongoClient } = require("mongodb");
const validateUtils = require("./validateUtils");
const { DatabaseError } = require('./DatabaseError');
const { InvalidInputError } = require("./InvalidInputError");
const logger = require('../logger');

let client;
let fruitsCollection;

/**
 * connect to the online Mongodb database with the name stored in dbName
 */
async function initialize(fruit_db_test, reset = false, url) {

  logger.debug("debugging");
  logger.trace("tracing");

    try {
      
    //const url = process.env.URL_PRE + process.env.MONGODB_PWD + process.env.URL_POST;
    client = new MongoClient(url); //store connected client for use while the app is running
    await client.connect();
    //console.log("Connected to MongoDB");
    logger.info("Connected to MongoDB");
    const db = client.db(fruit_db_test);
    // Check to see if the pokemons collections exist
    collectionCursor = await db.listCollections({name: "fruits"});
    collectionArray = await collectionCursor.toArray();

    //if there's data in the database, then reset
    if(collectionArray.length > 0 && reset){
      await db.collection("fruits").drop();
    }

    if(collectionArray.length == 0){
      //collation specifying case-insensitive collection
      const collation = {locale: "en", strength: 1};
      // no math was found, so create new collection
      await db.createCollection("fruits", {collation: collation});
    }

    fruitsCollection = db.collection("fruits"); //convient access to pokemons collection
    } catch (err) {
      console.log(err.message);
      throw new DatabaseError("Database is not working").message;
    }  
}

/**
 * clost the connection to the database
 */
async function close(){
  try{
    await client.close();
    logger.info("Connected to MongoDB")
    
  } catch(err){
    console.log(err.message);
  }
}

/**
 * Get all pokemons from the database
 * @returns fruitsCollection
 */
function getCollection(){
  return fruitsCollection;
}

/**
 * add a new fruit to the fruits database
 * use validation to check if the name vitamin, calories, details and image are valid
 * @param {String} name 
 * @param {String} vitamin 
 * @param {Int32} calories 
 * @param {String} details 
 * @param {String} Image 
 * @returns fruit object
 * @throws {DatabaseError} will throw when cannot upload fruit to database
 * @throws {InvalidInputError} will throw if the fruit's parameters are invalid
 */
async function addFruit(name,vitamin,calories,details,image){
  try {
    
    validateUtils.isValid2(name,vitamin,calories,details,image);

    let fruit = { "name": name, "vitamin": vitamin, "calories": calories, "details": details, "image": image };

    await fruitsCollection.insertOne({ name: name, vitamin: vitamin, calories: calories, details: details, image: image });

    return fruit; 

  } catch (error) {
    if (error instanceof InvalidInputError){
      logger.error("validation error in Add fruit" + error.message)
      throw new InvalidInputError("Validation error in Add fruit" + error.message)
    }

    logger.error("Could not upload fruit to DB")
    throw new DatabaseError("Could not upload fruit to DB");
  }
}

/**
 * find a fruit by name in databse
 * @param {string} name 
 * @returns fruit object
 * @throws {DatabaseError} will throw when cannot try to find fruit in database
 * @throws {InvalidInputError} will throw if the fruit's name is invalid or cannot find in database
 */
async function getSingleFruit(name){
  let fruit;

  try {

    fruit = await fruitsCollection.findOne({ name: name });

  } catch (error) {  
    logger.error("Could not try to find fruit to DB");
    throw new DatabaseError("Could not try to find fruit to DB");
  }

  if(!fruit){
    logger.error("Could not find fruit with name: " + name);
    throw new InvalidInputError("Could not find fruit with name: " + name);
  }

  return fruit; 

}

/**
 * get all fruits from the database 
 * @returns all fruits in the database
 * @throws {DatabaseError} will throw when cannot try to find all fruits in database
 */
async function getAllFruits(){
  try {
    let allFruits = await fruitsCollection.find().toArray();
    return allFruits;

  } catch (error) {
    logger.error("Could not find try to find all pokemons to DB")
    throw new DatabaseError("Could not find try to find all pokemons to DB");
  }

}

/**
 * delete a pokemon from the database
 * @param {String} name 
 * @throws {DatabaseError} will throw when cannot try to delete fruit in database
 * @throws {InvalidInputError} will throw if the fruit's name is invalid or cannot delete in database because doesn't exit
 */
async function deleteFruit(name){
    
  let deleteStatus;
  let fruit = await fruitsCollection.findOne({ name: name });
    try {
      
     deleteStatus = await fruitsCollection.deleteOne({ name: name });
    } catch (error) {
      logger.error("Could not try to delete fruits to DB")
      throw new DatabaseError("Could try not delete fruit to DB");
    }

    if(deleteStatus.deletedCount == 0){
      logger.error("Could not try to delete fruits to DB")
      throw new InvalidInputError("Could not delete fruit with name: " + name);
    }

    return fruit

}

/**
 * update a pokemon in the database
 * validate if the the new given name, vitamin, calories and the old name is valid
 * it use validateUtils for the new one
 * If the mondgod update return null then it assume that the old name is invalid
 * 
 * @param {String} oldName 
 * @param {String} newName 
 * @param {String} newVitamin 
 * @param {String} newCalories 
 * @param {String} newDetails 
 * @param {String} newImage
 * 
 * @throws {DatabaseError} will throw when cannot try to update fruit in database
 * @throws {InvalidInputError} will throw if the fruit's name is invalid or cannot update fruit in database because doesn't exist
 */
async function updateFruit(oldName,newName, newVitamin, newCalories, newDetails, newImage){
  let updateStatus
  let fruit = { "name": newName, "vitamin": newVitamin, "calories": newCalories, "details": newDetails, "image": newImage };
  try {
  validateUtils.isValid2(newName,newVitamin,newCalories,newDetails,newImage);
  updateStatus = await fruitsCollection.updateOne({ name: oldName }, { $set: { name: newName, vitamin: newVitamin, calories: newCalories, details: newDetails, image: newImage } });

  } catch (error) {
    
    if (error instanceof InvalidInputError){
      logger.error("Validation error in update fruit" + error.message)
      throw new InvalidInputError("Validation error in update fruit" + error.message)
    }

    logger.error("Could not try to update fruits to DB")
    throw new DatabaseError("Could not try to update fruits to DB");
  }

  if(updateStatus.matchedCount != 1){
    logger.error("Could not update fruit with name: " + oldName)
    throw new InvalidInputError("Could not update fruit with name: " + oldName);
  } 

  return fruit;

}

module.exports = { getCollection, initialize, addFruit, getSingleFruit, getAllFruits, deleteFruit, updateFruit, close};
