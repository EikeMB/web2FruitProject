const { response } = require('express');
const express = require('express');
const { InvalidInputError } = require('../models/InvalidInputError');
const { DatabaseError } = require('../models/DatabaseError');
const router = express.Router();
const routeRoot = '/';
const model = require("../models/fruitModelMongoDb"); // add to use model
const logger = require('../logger');
const {authenticateUser} = require("./sessionController");

/**
 * A controller that adds fruits to the database.
 * @param{*} request contain body with fruit's name, vitamin and calories
 * @param{*} response sends us 200 when added successfully, 400 on invalid inputs, 500 on database errors
 */
router.post("/fruits/", addFruitControl); // Define endpoint
 async function addFruitControl(request, response) {
  try{
    const authenticatedSession = authenticateUser(request);
    if(!authenticatedSession){
        response.sendStatus(401);
        return;
    }
    let returnedFruit = await model.addFruit(request.body.fruitName,request.body.fruitVitamin,request.body.fruitCalories, request.body.fruitDetails, request.body.fruitImage);
    if(returnedFruit){

      logger.info("Successfully added a fruit");
      response.status(200);
      response.send(returnedFruit);
    }
    else {

      logger.error("Unexpected failure to add fruit");
      response.status(400);
      response.send({errorMessage: "Failed to add " + returnedFruit.name});
    }    
  }catch(err){

    logger.error("Failed to add a fruit " + err.message);
    if (err instanceof DatabaseError) {
      response.status(500);
      response.send({errorMessage: "System error trying to add fruit " + err.message})
    }
    else if(err instanceof InvalidInputError){
      response.status(400);
      response.send({errorMessage: "Validation error trying to add fruit: " + err.message})
    }
    else{
      response.status(500);
      response.send({errorMessage: "Unexpected error trying to add fruit " + err.message})
    }
  }
}

/**
 * A controller that finds fruits from the database.
 * @param{*} request contain parameter with fruit's name
 * @param{*} response sends us 200 when added successfully, 400 on invalid inputs, 500 on database errors
 */
router.get("/fruits/:fruitName", findFruitControl); // Define endpoint
async function findFruitControl(request, response) {
  let tempFruitName = request.params.fruitName
  try{
    
   let returnedfruit = await model.getSingleFruit(tempFruitName);
   if(returnedfruit){
    logger.info("Successfully found the Fruit");
     response.status(200);
     response.send(returnedfruit);
   }
   else {

     logger.error("Unexpected failure to find the fruit");
     response.status(400);
     response.send({errorMessage: "Failed to find " + tempFruitName});
   }    
 }catch(err){

   logger.error("Failed to find the fruit " + err.message);
   if (err instanceof DatabaseError) {
     response.status(500);
     response.send({errorMessage: "System error trying to find fruit " + err.message})
   }
   else if(err instanceof InvalidInputError){
     response.status(400);
     response.send({errorMessage: "Validation error trying to find fruit " + err.message})
   }
   else{
     response.status(500);
     response.send({errorMessage: "Unexpected error trying to find fruit " + err.message})
   }
 }
}


/**
 * A controller that finds all fruits from the database.
 * @param{*} request is not being use, only to call the function
 * @param{*} response sends us 200 when added successfully, 500 on database errors
 */
router.get("/fruits", findAllFruitControl); // Define endpoint
async function findAllFruitControl(request, response) {
  try{
    
    let fruitsList;
    let returnedfruit = await model.getAllFruits();
    
    fruitsList = await message(returnedfruit);
    logger.info("Successfully found all fruits");
    response.status(200);
    response.send(returnedfruit); 
   }  
  catch(err){
   logger.error("Failed to find all fruit " + err.message);
   if (err instanceof DatabaseError) {
     response.status(500);
     response.send({errorMessage: "System error trying to add fruit " + err.message})
   }
   else{
     response.status(500);
     response.send({errorMessage: "Unexpected error trying to find all fruit " + err.message})
   }
 }
}

/**
 * 
 * @param {string[]} fruits 
 * @returns the list of fruits
 */
async function message(fruits) {
  let fruitList = "";
     for (let i = 0; i < fruits.length; i++) {
      fruitList += "\n---" + fruits[i].name;
      }
      return fruitList;
}

/**
 * A controller that deletes fruits to the database.
 * @param{*} request contain body with fruit's name, vitamin and calories
 * @param{*} response sends us 200 when added successfully, 400 on invalid inputs, 500 on database errors
 */
router.delete("/fruits/:fruitName", deleteFruitControl); // Define endpoint
async function deleteFruitControl(request, response) {
  let tempFruitName = request.params.fruitName
  try{
    const authenticatedSession = authenticateUser(request);
    if(!authenticatedSession){
        response.sendStatus(401);
        return;
    }
    let returnedFruit = await model.deleteFruit(tempFruitName);
     logger.info("Successfully deleted the Fruit");
     
     response.status(200);
     response.send(returnedFruit);

 }catch(err){

   logger.error("Failed to add a fruit " + err.message);

   if (err instanceof DatabaseError) {
     response.status(500);
     response.send({errorMessage: + "System error trying to delete fruit " + err.message})
   }
   else if(err instanceof InvalidInputError){
     response.status(400);
     response.send({errorMessage: + "Validation error trying to delete fruit " + err.message})
   }
   else{
     response.status(500);
     response.send({errorMessage: + "Unexpected error trying to delete fruit " + err.message})
   }
 }
}

/**
 * A controller that updates fruits to the database.
 * @param{*} request contain body with old fruit's name then new fruit's name, vitamin, calories, details and image
 * @param{*} response sends us 200 when added successfully, 400 on invalid inputs, 500 on database errors
 */
router.put("/fruits", updateFruitControl); // Define endpoint
 async function updateFruitControl(request, response) {
  try{
    const authenticatedSession = authenticateUser(request);
    if(!authenticatedSession){
        response.sendStatus(401);
        return;
    }
    let returnedFruit = await model.updateFruit(request.body.oldFruitName,request.body.newFruitName,request.body.fruitVitamin,request.body.fruitCalories,request.body.fruitDetails,request.body.fruitImage);
    if(returnedFruit){

      logger.info("Successfully update a fruit");
      response.status(200);
      response.send(returnedFruit);
    }
    else {

      logger.error("Unexpected failure to update fruit");
      response.status(400);
      response.send("Failed to update " + returnedFruit.name);
    }    
  }catch(err){

    logger.error("Failed to update a fruit " + err.message);
    if (err instanceof DatabaseError) {
      response.status(500);
      response.send({errorMessage: + "System error trying to update fruit " + err.message})
    }
    else if(err instanceof InvalidInputError){
      response.status(400);
      response.send({errorMessage: + "Validation error trying to update fruit " + err.message})
    }
    else{
      response.status(500);
      response.send({errorMessage: + "Unexpected error trying to update fruit " + err.message})
    }
  }
}

module.exports = {addFruitControl,findAllFruitControl, findFruitControl, deleteFruitControl, updateFruitControl, router, routeRoot}
 