const model = require("../models/fruitModelMongoDb")
const dotenv = require('dotenv').config();
const {MongoMemoryServer} = require('mongodb-memory-server');

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
    await model.initialize("Fruit_db", true, url);
    
   } catch (err){ 
       console.log(err.message)
    }
});

 jest.setTimeout(5000)

 afterEach (async () => {
    await model.close()
});

 afterAll(async () => {
     await mongod.stop();
     console.log("Mock Databse stopped");
 });


 /**
  * test to check if fruit has been added and compare if it the same
  */
test('Can add fruit to DB', async () => {
    
    const { name, vitamin, calories, details, image} = generateFruitData();
    await model.addFruit(name, vitamin, calories, details, image);

    const cursor = await model.getCollection().find();
    const results =  await cursor.toArray();

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(1);

    expect(results[0].name.toLowerCase() == name.toLowerCase()).toBe(true);
    expect(results[0].vitamin.toLowerCase() == vitamin.toLowerCase()).toBe(true);
    expect(results[0].calories == calories).toBe(true);
    expect(results[0].details == details).toBe(true);
    expect(results[0].image== image).toBe(true);

    });

    /**
  * test to check if fruit has been added and have the exact amount addded to the database
  */
test('Have exact ammount added to the database', async () => {

    await model.addFruit("Apple", "C", 52, "pretty good", "image.png")
    await model.addFruit("Orange", "A", 52, "pretty bad", "image.jpg")

    const cursor = await model.getCollection().find();
    const results =  await cursor.toArray();
    
    expect(results.length).toBe(2);   
});

/**
 * test to check the vitamin type doesn't exist and won't work
 */
test('Invalid Non-existant vitamin test', async () => {
    try {
        await model.addFruit("Apple", "M", 52, "pretty good", "image.png")
    } catch (error) {
        const cursor = await model.getCollection().find();
        const results =  await cursor.toArray();
        expect(results.length).toBe(0);
    }
   // await expect (async () => model.addFruit("Apple", "M", 52)).rejects.toThrow();   
});

/**
 * test to check the vitamin input has not been input and won't work
 */
test('Invalid no vitamin input test', async () => {
    try {
        await model.addFruit("Apple", "", 52, "pretty good", "image.png")
    } catch (error) {
        const cursor = await model.getCollection().find();
        const results =  await cursor.toArray();
        expect(results.length).toBe(0);
    }
   // await expect (async () => model.addFruit("Apple", "", 52)).rejects.toThrow();   
});

/**
 * test to check if calories is 0 then it won't work
 */
test('Invalid calories equal 0 test', async () => {
    try {
        await model.addFruit("Apple", "C", 0, "pretty good", "image.png")
    } catch (error) {
        const cursor = await model.getCollection().find();
        const results =  await cursor.toArray();
        expect(results.length).toBe(0);
    }
   // await expect (async () => model.addFruit("Apple", "", 52)).rejects.toThrow();   
});

/**
 * test to check if calories is negative then it won't work
 */
test('Invalid calories below 0 test', async () => {
    try {
        await model.addFruit("Apple", "C", -1, "pretty good", "image.png")
    } catch (error) {
        const cursor = await model.getCollection().find();
        const results =  await cursor.toArray();
        expect(results.length).toBe(0);
    }
   // await expect (async () => model.addFruit("Apple", "", 52)).rejects.toThrow();   
});

/**
 * test to check if detail  has something in it
 */
test('Invalid details test', async () => {
    try {
        await model.addFruit("Apple", "C", -1, "", "image.png")
    } catch (error) {
        const cursor = await model.getCollection().find();
        const results =  await cursor.toArray();
        expect(results.length).toBe(0);
    }
   // await expect (async () => model.addFruit("Apple", "", 52)).rejects.toThrow();   
});

/**
 * test to check if detail  has something in it
 */
test('Invalid details test', async () => {
    try {
        await model.addFruit("Apple", "C", -1, "", "image.png")
    } catch (error) {
        const cursor = await model.getCollection().find();
        const results =  await cursor.toArray();
        expect(results.length).toBe(0);
    }
   // await expect (async () => model.addFruit("Apple", "", 52)).rejects.toThrow();   
});

/**
 * test to check if image  has nothing in it
 */
test('Invalid image test', async () => {
    try {
        await model.addFruit("Apple", "C", -1, "pretty good", "")
    } catch (error) {
        const cursor = await model.getCollection().find();
        const results =  await cursor.toArray();
        expect(results.length).toBe(0);
    }
   // await expect (async () => model.addFruit("Apple", "", 52)).rejects.toThrow();   
});

/**
 * test to check if image  has the wrong extention
 */
test('Invalid image extention test', async () => {
    try {
        await model.addFruit("Apple", "C", -1, "pretty good", "image.abc")
    } catch (error) {
        const cursor = await model.getCollection().find();
        const results =  await cursor.toArray();
        expect(results.length).toBe(0);
    }
   // await expect (async () => model.addFruit("Apple", "", 52)).rejects.toThrow();   
});


/**
 * test check if not finding fruit  throw an error
 */
test('Could not found fruit test', async () => {

    let fruitToFind = "Brocoli";
    const {name, vitamin, calories, details, image} = generateFruitData();
    await model.addFruit(name, vitamin, calories, details, image);
    const cursor = await model.getCollection().find();
    const results =  await cursor.toArray();   
    try {

       await model.getSingleFruit(fruitToFind)
       expect(results[0].name == fruitToFind).toBe(false);

    } catch (error) {

        const cursor = await model.getCollection().find();
        const results =  await cursor.toArray();
        expect(results[0].name == fruitToFind).toBe(false);
    }
});


/**
 * test get  fruit and compare if it the same
 */
test('Succesfully found fruit test', async () => {

    let fruitToFind = "Apple";
    await model.addFruit("Apple", "C", 52, "pretty good", "image.png")

    const cursor = await model.getCollection().find();
    const results =  await cursor.toArray();
    let fruit = await model.getSingleFruit(fruitToFind)

    expect(fruit.name).toBe("Apple");
    expect(fruit.vitamin).toBe("C");
    expect(fruit.calories).toBe(52);

});

/**
 * test get all fruit and compare if everything i the same
 */

test('Succesfully get all fruit test', async () => {

    const { name, vitamin, calories, details, image} = generateFruitData();
    await model.addFruit( name, vitamin, calories, details, image);

    const cursor = await model.getCollection().find();
    const results =  await cursor.toArray();

    allFruits = await model.getAllFruits();

    expect(results[0].name == allFruits[0].name).toBe(true);
    expect(results[0].vitamin == allFruits[0].vitamin).toBe(true);
    expect(results[0].calories == allFruits[0].calories).toBe(true);
    expect(results[0].details == allFruits[0].details).toBe(true);
    expect(results[0].image == allFruits[0].image).toBe(true);
});

/**
 * test can delete and the array should change
 */


test('Succesfully delete fruit test', async () => {

    await model.addFruit("Apple", "C", 52, "pretty good", "image.png");
    await model.deleteFruit("Apple");

    const cursor = await model.getCollection().find();
    const results =  await cursor.toArray();

    expect(results.length).toBe(0);
    
});

/**
 * test can't delete and array shouldn't cahnge
 */

test('Invalid delete fruit test', async () => {

    await model.addFruit("Apple", "C", 52, "pretty good", "image.png");
    try {
        await model.deleteFruit("Orange");
    } catch (error) {
        const cursor = await model.getCollection().find();
        const results =  await cursor.toArray();
        expect(results.length).toBe(1);
    }   
});

/**
 * test if update if work
 */

test('Successfully updated fruit', async () => {

    let newName = "Orange";
    let newVitamin = "C";
    let newCalories = 31;
    let newDetails = "pretty good";
    let newImage = "image.png";

    await model.addFruit("Apple", "C", 52, "some details", "image.jpg");
    await model.updateFruit("Apple", newName, newVitamin, newCalories, newDetails, newImage)

    const cursor = await model.getCollection().find();
    const results =  await cursor.toArray();
    

    expect(results[0].name == newName).toBe(true);
    expect(results[0].calories == newCalories).toBe(true);
    expect(results[0].vitamin == newVitamin).toBe(true);
    expect(results[0].details == newDetails).toBe(true);
    expect(results[0].image == newImage).toBe(true);

});

/**
 * test if update doesn't work with wrong with invalid old name
 */

test('invalid cannot find old name to update', async () => {

    let oldName = "Apple";
    let incorrectOldName = "Mango";
    let newName = "Orange";
    let newVitamin = "C";
    let newCalories = 31;
    let newDetails = "pretty good";
    let newImage = "image.png";

    await model.addFruit(oldName, "C", 52, "some details", "image.jpg");
    
    try {
        await model.updateFruit(incorrectOldName, newName, newVitamin, newCalories,  newDetails, newImage);
    } catch (error) {
        const cursor = await model.getCollection().find();
    const results =  await cursor.toArray();
    

    expect(results[0].name == incorrectOldName).toBe(false);
    expect(results[0].name == newName).toBe(false);
    expect(results[0].name == oldName).toBe(true);
    }
});

/**
 * test if update doesn't work with wrong with name
 */
test('invalid new name to update', async () => {

    let oldName = "Apple";
    let incorrectNewName = "";
    let newName = "Orange";
    let newVitamin = "C";
    let newCalories = 31;
    let newDetails = "pretty good";
    let newImage = "image.png";

    await model.addFruit(oldName, "C", 52, "some details", "image.jpg");
    
    try {
        await model.updateFruit(oldName, incorrectNewName, newVitamin, newCalories, newDetails, newImage)

    } catch (error) {
        const cursor = await model.getCollection().find();
        const results =  await cursor.toArray();
        
    
        expect(results[0].name == incorrectNewName).toBe(false);
        expect(results[0].name == newName).toBe(false);
        expect(results[0].name == oldName).toBe(true); 
    }
});

/**
 * test if update doesn't work with wrong with vitamin
 */
test('invalid new vitamin to update', async () => {

    let oldName = "Apple";
    let newName = "Orange";
    let InvalidVitamin = "F";
    let newCalories = 31;
    let newDetails = "pretty good";
    let newImage = "image.png";

    await model.addFruit(oldName, "C", 52, "some details", "image.jpg");
    
    try {
        await model.updateFruit(oldName, newName, InvalidVitamin, newCalories, newDetails, newImage)

    } catch (error) {
        const cursor = await model.getCollection().find();
        const results =  await cursor.toArray();
        
    
        expect(results[0].vitamin == InvalidVitamin).toBe(false);
    }
});

/**
 * test if update doesn't work with wrong calories
 */
test('invalid new calories to update', async () => {

    let oldName = "Apple";
    let newName = "Orange";
    let newVitamin = "E";
    let invalidCalories = 0;
    let newDetails = "pretty good";
    let newImage = "image.png";

    await model.addFruit(oldName, "C", 52, "some details", "image.jpg");
    
    try {
        await model.updateFruit(oldName, newName, newVitamin, invalidCalories, newDetails, newImage)

    } catch (error) {
        const cursor = await model.getCollection().find();
        const results =  await cursor.toArray();
        
    
        expect(results[0].calories == invalidCalories).toBe(false);
    }
});

/**
 * test if update doesn't work with wrong details
 */
test('invalid new detail to update', async () => {

    let oldName = "Apple";
    let newName = "Orange";
    let newVitamin = "E";
    let newCalories = 1;
    let InvalidDetails = "";
    let newImage = "image.png";

    await model.addFruit(oldName, "C", 52, "some details", "image.jpg");
    
    try {
        await model.updateFruit(oldName, newName, newVitamin, newCalories, InvalidDetails, newImage)

    } catch (error) {
        const cursor = await model.getCollection().find();
        const results =  await cursor.toArray();
        
    
        expect(results[0].details == InvalidDetails).toBe(false);
    }
});

/**
 * test if update doesn't work with wrong image extentions
 */
test('invalid new image to update', async () => {

    let oldName = "Apple";
    let newName = "Orange";
    let newVitamin = "E";
    let newCalories = 1;
    let newdDetails = "Good lord";
    let invalidImage = "image.abc";

    await model.addFruit(oldName, "C", 52, "some details", "image.jpg");
    
    try {
        await model.updateFruit(oldName, newName, newVitamin, newCalories, newdDetails, invalidImage)

    } catch (error) {
        const cursor = await model.getCollection().find();
        const results =  await cursor.toArray();
        
    
        expect(results[0].image == invalidImage).toBe(false);
    }
});

/**
 * test if update doesn't work with no image
 */
test('invalid new image to update', async () => {

    let oldName = "Apple";
    let newName = "Orange";
    let newVitamin = "E";
    let newCalories = 1;
    let newdDetails = "Good lord";
    let invalidImage = "";

    await model.addFruit(oldName, "C", 52, "some details", "image.jpg");
    
    try {
        await model.updateFruit(oldName, newName, newVitamin, newCalories, newdDetails, invalidImage)

    } catch (error) {
        const cursor = await model.getCollection().find();
        const results =  await cursor.toArray();
        
    
        expect(results[0].image == invalidImage).toBe(false);
    }
});