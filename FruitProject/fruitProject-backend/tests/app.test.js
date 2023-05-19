const { MongoMemoryServer } = require('mongodb-memory-server');
const model = require('../models/reviewsModel');
const dotenv = require('dotenv').config();
const app = require("../app");
const supertest = require("supertest");
const testRequest = supertest(app);

const reviewData = [
    { title: 'Avocado', content: 'Great on toast', rating: 5},
    { title: 'Orange', content: 'Amazing juice', rating: 5},
    { title: 'Apple', content: 'Not as good as orange', rating: 3},
    { title: 'Coconut', content: 'Makes good cookies', rating: 4},
    { title: 'Cherry', content: 'Sweet', rating: 5}
]

const generateReview = () => {
    const index = Math.floor(Math.random() * reviewData.length);
    return reviewData.slice(index, index + 1)[0];
}

let mongod;

dbName = "reviews_db_test";

beforeEach(async () => {
    try {
        mongod = await MongoMemoryServer.create();
        const url = mongod.getUri();
        await model.initialize(dbName, true, url);
        console.log("Mock Database started");
    } catch (error) {
        console.log(error.message);
    }
})

jest.setTimeout(10000);

afterEach(async () => {
    await mongod.stop();
    console.log("Mock Database stopped");
});

test("POST /reviews success case", async () => {
    const {title, content, rating} = generateReview();

    const testResponse = await testRequest.post('/reviews').send({
        title: title,
        content: content,
        rating: rating
    })

    expect(testResponse.status).toBe(200);
    collection = await model.getCollection();
    const cursor = collection.find();
    const results = await cursor.toArray();

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(1);
    expect(results[0].title.toLowerCase()).toBe(title.toLocaleLowerCase());
    expect(results[0].content.toLowerCase()).toBe(content.toLocaleLowerCase());
    expect(results[0].rating).toBe(rating);
})

test("POST /reviews client side failure", async() => {
    const {title, content, rating} = generateReview();

    const testResponse = await testRequest.post("/reviews").send({
        title: title,
        content: content,
        rating: 10
    })

    expect(testResponse.status).toBe(400);
})

test("POST /reviews server side failure", async() => {
    const {title, content, rating} = generateReview();

    model.close();
    const testResponse = await testRequest.post("/reviews").send({
        title: title,
        content: content,
        rating: rating
    })

    expect(testResponse.status).toBe(500);
})

test("GET /reviews/:title successful find", async() => {
    const {title, content, rating} = generateReview();
    generated = {title: title, content: content, rating: rating};
    collection = await model.getCollection();
    await collection.insertOne(generated);

    const testResponse = await testRequest.get("/reviews/" + title)
    expect(testResponse.status).toBe(200);


})

test("GET /reviews/:title unsuccessful find client side failure", async() => {
    const {title, content, rating} = generateReview();
    generated = {title: title, content: content, rating: rating};
    collection = await model.getCollection();
    await collection.insertOne(generated);

    const testResponse = await testRequest.get("/reviews/title")
    expect(testResponse.status).toBe(400);


})

test("GET /reviews/:title unsuccessful find server side failure", async() => {
    const {title, content, rating} = generateReview();
    generated = {title: title, content: content, rating: rating};
    collection = await model.getCollection();
    await collection.insertOne(generated);

    model.close();
    const testResponse = await testRequest.get("/reviews/title")
    expect(testResponse.status).toBe(500);


})

test("GET /reviews successful find all", async() => {
    const {title, content, rating} = generateReview();
    generated = {title: title, content: content, rating: rating};
    collection = await model.getCollection();
    await collection.insertOne(generated);
    generated = generateReview();
    await collection.insertOne({title: generated.title, content: generated.content, rating: generated.rating});
    generated = generateReview();
    await collection.insertOne({title: generated.title, content: generated.content, rating: generated.rating});
    generated = generateReview();
    await collection.insertOne({title: generated.title, content: generated.content, rating: generated.rating});
    generated = generateReview();
    await collection.insertOne({title: generated.title, content: generated.content, rating: generated.rating});
    result = await model.getAllReviews();

    const testResponse = await testRequest.get("/reviews")
    expect(testResponse.status).toBe(200);


})

test("GET /reviews unsuccessful find all server side failure", async() => {
    const {title, content, rating} = generateReview();
    generated = {title: title, content: content, rating: rating};
    collection = await model.getCollection();
    await collection.insertOne(generated);
    generated = generateReview();
    await collection.insertOne({title: generated.title, content: generated.content, rating: generated.rating});
    generated = generateReview();
    await collection.insertOne({title: generated.title, content: generated.content, rating: generated.rating});
    generated = generateReview();
    await collection.insertOne({title: generated.title, content: generated.content, rating: generated.rating});
    generated = generateReview();
    await collection.insertOne({title: generated.title, content: generated.content, rating: generated.rating});
    result = await model.getAllReviews();

    model.close();
    const testResponse = await testRequest.get("/reviews")
    expect(testResponse.status).toBe(500);


})

test("PUT /reviews successful update", async () => {
    const {title, content, rating} = generateReview();
    generated = {title: title, content: content, rating: rating};
    collection = await model.getCollection();
    await collection.insertOne(generated);
    newGenerated = {title: title, content: content, rating: rating};
    newGenerated = generateReview();

    const testResponse = await testRequest.put("/reviews").send({
        "oldTitle":generated.title,
        "oldContent":generated.content,
        "oldRating":generated.rating,
        "newTitle":newGenerated.title,
        "newContent":newGenerated.content,
        "newRating":newGenerated.rating
    })
    expect(testResponse.status).toBe(200);
    collection = await model.getCollection();
    const cursor = collection.find();
    const results = await cursor.toArray();

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(1);
    expect(results[0].title.toLowerCase()).toBe(newGenerated.title.toLocaleLowerCase());
    expect(results[0].content.toLowerCase()).toBe(newGenerated.content.toLocaleLowerCase());
    expect(results[0].rating).toBe(newGenerated.rating);
})

test("PUT /reviews unsuccessful update client side failure", async () => {
    const {title, content, rating} = generateReview();
    generated = {title: title, content: content, rating: rating};
    collection = await model.getCollection();
    await collection.insertOne(generated);
    newGenerated = {title: title, content: content, rating: rating};
    newGenerated = generateReview();

    const testResponse = await testRequest.put("/reviews").send({
        "oldTitle":"title",
        "oldContent":generated.content,
        "oldRating":generated.rating,
        "newTitle":newGenerated.title,
        "newContent":newGenerated.content,
        "newRating":newGenerated.rating
    })
    expect(testResponse.status).toBe(400);
})

test("PUT /reviews unsuccessful update server side failure", async () => {
    const {title, content, rating} = generateReview();
    generated = {title: title, content: content, rating: rating};
    collection = await model.getCollection();
    await collection.insertOne(generated);
    newGenerated = {title: title, content: content, rating: rating};
    newGenerated = generateReview();
    model.close();
    const testResponse = await testRequest.put("/reviews").send({
        "oldTitle":"title",
        "oldContent":generated.content,
        "oldRating":generated.rating,
        "newTitle":newGenerated.title,
        "newContent":newGenerated.content,
        "newRating":newGenerated.rating
    })
    expect(testResponse.status).toBe(500);
})

test("DELETE /reviews/:title successful delete", async () => {
    const {title, content, rating} = generateReview();
    generated = {title: title, content: content, rating: rating};
    collection = await model.getCollection();
    await collection.insertOne(generated);

    const testResponse = await testRequest.delete("/reviews/" + title);

    expect(testResponse.status).toBe(200);
})

test("DELETE /reviews/:title unsuccessful delete client side failure", async () => {
    const {title, content, rating} = generateReview();
    generated = {title: title, content: content, rating: rating};
    collection = await model.getCollection();
    await collection.insertOne(generated);

    const testResponse = await testRequest.delete("/reviews/title");

    expect(testResponse.status).toBe(400);
})

test("DELETE /reviews/:title unsuccessful delete server side failure", async () => {
    const {title, content, rating} = generateReview();
    generated = {title: title, content: content, rating: rating};
    collection = await model.getCollection();
    await collection.insertOne(generated);
    model.close();
    const testResponse = await testRequest.delete("/reviews/" + title);

    expect(testResponse.status).toBe(500);
})