// const dotenv = require('dotenv').config();
// const url = process.env.URL_PRE + process.env.MONGODB_PWD + process.env.URL_POST;
// const http = require('http')
// const port = 1339;
// const model = require('./models/fruitModelMongoDb');
// const dbName = "Fruit_db";
// initialized = model.initialize(dbName, true, url);
// const { DatabaseError } = require('./models/DatabaseError');
// const { InvalidInputError } = require('./models/InvalidInputError');
// const { Int32 } = require('mongodb');


// http.createServer(async function (request, response) {
//     await initialized;    
//     response.writeHead(200, {'Content-Type': 'text/plain'});
//     response.write(await handleAddFruit("Apple", "C", 52));
//     response.write(await handleAddFruit("Mango", "C", 52));
//     response.write(await handleAddFruit("Coconut", "C", 52));
//     response.write(await handleAddFruit("", "C", 52));
//     response.write(await handleAddFruit("Apple", "O", 52));
//     response.write(await handleAddFruit("Apple", "C", 0));
//     response.write(await handleAddFruit("Apple", "C", -1));

//     response.write("------------------------------------------------\n");
//     response.write(await handleDeleteFruit("Apple"));
//     response.write(await handleDeleteFruit("Orange"));

//     response.write("------------------------------------------------\n");
//     response.write(await handleGetSingleFruit("Mango"));
//     response.write(await handleGetSingleFruit("Orange"));

//     response.write("------------------------------------------------\n");
//     response.write(await handleUpdateFruit("Mango","Peach", "C", 52));
//     response.write(await handleUpdateFruit("Mango","", "C", 52));
//     response.write(await handleUpdateFruit("Mango","Peach", "O", 52));
//     response.write(await handleUpdateFruit("Mango","Peach", "C", 0));
//     response.write(await handleUpdateFruit("Mango","Peach", "C", -1));
//     response.write(await handleUpdateFruit("NoName","Peach", "C", 52));

//     response.write("------------------------------------------------\n");
//     response.write(await handleGetAllFruits());



//     response.end('\n\nEND');
// }).listen(port);


// /**
//  * add fruit to database and display the result of the operation
//  * @param {String} name 
//  * @param {String} vitamin 
//  * @param {Int32} calories 
//  * @returns a message of if the fruit is added
//  */
// async function handleAddFruit(name,vitamin,calories) {
//     try {
//     let returnedFruit = await model.addFruit(name,vitamin,calories);
//     return "Fruit added to Database: " + returnedFruit.name + "\n";    
//     } catch(err){
//         return err.message+ "\n";
//     }
// }

// /**
//  * Find the fruit with the given name
//  * @param {string} name 
//  * @returns a message of if the fruit is found
//  */
// async function handleGetSingleFruit(name){

//     try {
//         let returnedFruit = await model.getSingleFruit(name);
//         return "Fruit Found to DB: " + returnedFruit.name + "\n"; 

//     } catch (err) {

//         return err.message+ "\n";
//     }   
// }

// /**
//  * get all the fruits in the database
//  * @returns a message of all the fruits in the database
//  */
// async function handleGetAllFruits(){

//     try {
//         let returnedFruit = await model.getAllFruits();
//         let message = "";
//         for (let i = 0; i < returnedFruit.length; i++) {
//             message += "\n---" + returnedFruit[i].name;
//           }
//         return "Fruit Found to DB:\n" + message + "\n"; 
//     } catch (err) 
//     {
//         return err.message + "\n";
//     }
// }   


// /**
//  * delete the fruit with the given name
//  * @param {string} name 
//  * @returns a message of if the fruit is deleted
//  */
// async function handleDeleteFruit(name){    

//     try {
//         await model.deleteFruit(name);
//         return "Deleted pokemon: " + name + "\n";

//     } catch(err){
//         return err.message+ "\n";  
//     }
// }

// /**
//  * update a pre-added fruit in the database
//  * @param {string} originalName 
//  * @param {string} newName 
//  * @param {string} newVitamin 
//  * @param {Int32} newCalories 
//  * @returns message of if the fruit is updated
//  */
// async function handleUpdateFruit(originalName, newName, newVitamin, newCalories){    
//     try {
//         await model.updateFruit(originalName, newName, newVitamin, newCalories);
//         return "Fruit Updated: " + originalName + "\n";

//     } catch(err){
//         return err.message+ "\n";        
//     }
// }

require("dotenv").config();
const app = require('./app.js');
const port = 1339;
const fruitModel = require("./models/fruitModelMongoDb");
const userModel = require("./models/userModel.js")
const reviewModel = require("./models/reviewsModel.js")
const url = process.env.URL_BEGIN + process.env.MONGODB_PWD + process.env.URL_END;

fruitModel.initialize("Fruit_db", false, url,)
    .then(
        userModel.initialize("user_db", false, url)
        .then(
            reviewModel.initialize("review_db", false, url)
            .then(
                app.listen(port) // Run the server
            )
        )
        
    );

