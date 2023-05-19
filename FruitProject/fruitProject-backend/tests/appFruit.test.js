const model = require("../models/fruitModelMongoDb")
const dotenv = require('dotenv').config();
const {MongoMemoryServer} = require('mongodb-memory-server');
const app = require("../app"); 
const supertest = require("supertest");
const { request } = require("../app");
const testRequest = supertest(app); 


const fruitData = [
    {name: 'Apple', vitamin: 'A', calories: 52, details: "pretty good", image: "image.png"},
    {name: 'Orange', vitamin: 'B', calories: 52, details: "pretty good", image: "image.png"},
    {name: 'Mango', vitamin: 'C', calories: 52, details: "pretty good", image: "image.png"},
    {name: 'Coconut', vitamin: 'D', calories: 52, details: "pretty good", image: "image.png"},
    {name: 'Strawberry', vitamin: 'E', calories: 52, details: "pretty good", image: "image.png"}
]

const generateFruitData = () => fruitData.splice(Math.floor((Math.random() * fruitData.length)), 1)[0];

let mongod;
beforeAll(async () => {
     mongod = await MongoMemoryServer.create();
     console.log("Mock Database started")
 });

beforeEach(async () => {    
   try {
    const url = mongod.getUri();
    await model.initialize("pokemon_db", true, url);
    
   } catch (err){ 
       console.log(err.message)
    }
});

 jest.setTimeout(10000)

 afterEach (async () => {
    await model.close()
});

 afterAll(async () => {
     await mongod.stop();
     console.log("Mock Databse stopped");
 });

 test("GET find fruit controller, success case", async () => {

     const { name, vitamin, calories, details, image } = generateFruitData();
     await model.addFruit(name, vitamin, calories, details, image);

     const testResponse = await testRequest.get('/fruits/' + name);
     expect(testResponse.status).toBe(200);
});

test("GET find fruit controller, 400 error case", async () => {

    let nonExsistingName = "badName";

    const testResponse = await testRequest.get('/fruits/' + nonExsistingName);
    expect(testResponse.status).toBe(400);
});

test("GET find fruit controller, 500 error case", async () => {

    await model.close()
    let fruitName = "Apple";

    const testResponse = await testRequest.get('/fruits/' + fruitName);
    expect(testResponse.status).toBe(500);
});

test("POST create fruit controller, success case", async () => {

    const { name, vitamin, calories, details, image } = generateFruitData();

    const testResponse = await testRequest.post('/fruits').send({
		fruitName: name,
		fruitVitamin: vitamin,
        fruitCalories: calories,
        fruitDetails: details,
        fruitImage: image
    })

    expect(testResponse.status).toBe(200);
});

test("POST create fruit controller, 400 error case", async () => {
    const testResponse = await testRequest.post('/fruits').send({
		fruitName: "",
		fruitVitamin: "A",
        fruitCalories: 52,
        fruitDetails: "pretty good",
        fruitImage: "image.png"
    })

    expect(testResponse.status).toBe(400);

});

test("POST create fruit controller, 500 error case", async () => {
    await model.close()
    const testResponse = await testRequest.post('/fruits').send({
		fruitName: "Apple",
		fruitVitamin: "A",
        fruitCalories: 52,
        fruitDetails: "pretty good",
        fruitImage: "image.png"
    })

    expect(testResponse.status).toBe(500);

});

test("GET findAll fruit controller, success case", async () => {

    const { name, vitamin, calories, details, image } = generateFruitData();
    await model.addFruit(name, vitamin, calories, details, image);

    const testResponse = await testRequest.get('/fruits');
    expect(testResponse.status).toBe(200);
});


test("GET findAll fruit controller, 500 error case", async () => {

   await model.close()

   const testResponse = await testRequest.get('/fruits');
   expect(testResponse.status).toBe(500);
});

test("DELETE delete fruit controller, success case", async () => {

    const { name, vitamin, calories, details, image } = generateFruitData();
    await model.addFruit(name, vitamin, calories, details, image);

    const testResponse = await testRequest.delete('/fruits/' + name);
    expect(testResponse.status).toBe(200);
});

test("DELETE delete fruit controller, 400 error case", async () => {

    let nonExsistingName = "badName";

    const testResponse = await testRequest.delete('/fruits/' + nonExsistingName);
    expect(testResponse.status).toBe(400);
});

test("DELETE delete fruit controller, 500 error case", async () => {

    await model.close()
    let fruitName = "Apple";

    const testResponse = await testRequest.delete('/fruits/' + fruitName);
    expect(testResponse.status).toBe(500);
});

test("PUT update fruit controller, success case", async () => {

    const { name, vitamin, calories, details, image } = generateFruitData();
    await model.addFruit(name, vitamin, calories, details, image);

    const testResponse = await testRequest.put('/fruits').send({
        oldFruitName: name,
		newFruitName: "NewFruitName",
		fruitVitamin: vitamin,
        fruitCalories: calories,
        fruitDetails: details,
        fruitImage: image
    })

    expect(testResponse.status).toBe(200);
});

test("PUT /update 400 error case", async () => {

   let name = "Apple";
   let vitamin = "A";
   let calories = 52;
   let details = "pretty good";
   let image = "image.png";

    const testResponse = await testRequest.put('/fruits').send({
        oldFruitName: name,
		newFruitName: "",
		fruitVitamin: vitamin,
        fruitCalories: calories,
        fruitDetails: details,
        fruitImage: image
    })

    expect(testResponse.status).toBe(400);

});

test("PUT update fruit controller, 500 error case", async () => {
    await model.close()

    let name = "Apple";
    let vitamin = "A";
    let calories = 52;
    let details = "pretty good";
   let image = "image.png";
 
     const testResponse = await testRequest.put('/fruits').send({
         oldFruitName: name,
         newFruitName: "Orange",
         fruitVitamin: vitamin,
         fruitCalories: calories,
         fruitDetails: details,
        fruitImage: image
     })

    expect(testResponse.status).toBe(500);

});

    




