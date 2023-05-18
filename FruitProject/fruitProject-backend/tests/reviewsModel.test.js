const { MongoMemoryServer} = require('mongodb-memory-server'); 
const { DatabaseError } = require('../models/DatabaseError');
const { InvalidInputError } = require('../models/InvalidInputError');
const model = require('../models/reviewsModel');

const reviewData = [
    { title: 'Avocado', content: 'Great on toast', rating: 5, fruit: "", user: ""},
    { title: 'Orange', content: 'Amazing juice', rating: 5, fruit: "", user: ""},
    { title: 'Apple', content: 'Not as good as orange', rating: 3, fruit: "", user: ""},
    { title: 'Coconut', content: 'Makes good cookies', rating: 4, fruit: "", user: ""},
    { title: 'Cherry', content: 'Sweet', rating: 5, fruit: "", user: ""}
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

/**
 * testing that once a review is added it is in the database
 */
test('Successful add', async () => {
    const {title, content, rating, fruit, user} = generateReview();
    await model.addReview(fruit, title, content, rating, user);

    collection = await model.getCollection();
    const cursor = collection.find();
    const results = await cursor.toArray();

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(1);
    expect(results[0].title.toLowerCase()).toBe(title.toLowerCase());
    expect(results[0].content.toLowerCase()).toBe(content.toLowerCase());
    expect(results[0].rating).toBe(rating);
})

/**
 * testing that an error is thrown when an invalid rating is given when adding a review
 */
test('unsuccessful add: Invalid rating', async () => {
    const {title, content, rating, fruit, user} = generateReview();

    expect(async () => {
        await model.addReview(fruit, title, content, -6, user);
    }).rejects.toThrow(InvalidInputError);
})

/**
 * testing that multiple reviews can be added
 */
test('Successfully add two reviews', async () => {
    const {title, content, rating, fruit, user} = generateReview();
    generated = {title: title, content: content, rating: rating, fruit: fruit, user: user};
    await model.addReview(fruit, title, content, rating, user);
    generated = generateReview();
    await model.addReview(generated.fruit, generated.title, generated.content, generated.rating, generated.user);
    collection = await model.getCollection();
    const cursor = collection.find();
    const results = await cursor.toArray();

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(2);
})

/**
 * testing that the find method returns the correct review.
 */
test('Successful find', async () => {
    const {title, content, rating} = generateReview();
    generated = {title: title, content: content, rating: rating};
    collection = await model.getCollection();
    await collection.insertOne(generated);
    result = await model.getSingleReview(title);
    expect(result.title.toLowerCase()).toBe(generated.title.toLowerCase());
    expect(result.content.toLowerCase()).toBe(generated.content.toLowerCase());
})
/**
 * testing that an error is thrown when an invalid title is given
 */
test('Unsuccessful find: Invalid title', async () => {
    const {title, content, rating} = generateReview();
    generated = {title: title, content: content, rating: rating};
    collection = await model.getCollection();
    await collection.insertOne({generated});
    
    expect(async () => {
        await model.getSingleReview("not the title");
    }).rejects.toThrow(InvalidInputError);
})
/**
 * testing that all reviews are returned when calling getAllReviews
 */
test('Successful find all', async () => {
    const {title, content, rating} = generateReview();
    generated = {title: title, content: content, rating: rating};
    collection = await model.getCollection();
    await collection.insertOne({generated});
    generated = generateReview();
    await collection.insertOne({title: generated.title, content: generated.content, rating: generated.rating});
    generated = generateReview();
    await collection.insertOne({title: generated.title, content: generated.content, rating: generated.rating});
    generated = generateReview();
    await collection.insertOne({title: generated.title, content: generated.content, rating: generated.rating});
    generated = generateReview();
    await collection.insertOne({title: generated.title, content: generated.content, rating: generated.rating});
    result = await model.getAllReviews();
    expect(result.length).toBe(5);

})

/**
 * testing that the database is updated when updateReview is called
 */
test('Successful update', async () => {
    generated1 = generateReview();
    collection = await model.getCollection();
    await collection.insertOne({title: generated1.title, content: generated1.content, rating: generated1.rating});
    collection = await model.getCollection();
    const cursor = collection.find();
    const results1 = await cursor.toArray();
    generated2 = {title: generated1.title, content: generated1.content, rating: generated1.rating};
    generated2 = generateReview();
    

    await model.updateReview(generated1.title, generated1.content, generated1.rating, generated2.title, generated2.content, generated2.rating);
    const cursor2 = collection.find();
    const results2 = await cursor2.toArray();
    expect(results1[0].title).toBe(generated1.title);
    expect(results2[0].title).toBe(generated2.title);
})
/**
 * testing that an error is thrown when an invalid title is given
 */
test('Unsuccessful update: Invalid rating', async () => {
    const {title, content, rating} = generateReview();
    generated1 = {title: title, content: content, rating: rating};
    collection = await model.getCollection();
    await collection.insertOne({title: generated1.title, content: generated1.content, rating: generated1.rating});
    generated2 = {title: generated1.title, content: generated1.content, rating: generated1.rating};
    generated2 = generateReview();

    
    expect(async () => {
        await model.updateReview(generated1.title, generated1.content, generated1.rating, generated2.title, generated2.content, generated2.rating*-1);
    }).rejects.toThrow(InvalidInputError);
})
/**
 * testing that the correct review is deleted when deleteReview is called
 */
test('Successful Delete', async () => {
    const {title, content, rating} = generateReview();
    generated1 = {title: title, content: content, rating: rating};
    collection = await model.getCollection();
    await collection.insertOne({title: generated1.title, content: generated1.content, rating: generated1.rating});
    

    result = await model.deleteReview(generated1.title);
    expect(result).toBe(generated1.title);

})
/**
 * testing that no review is deleted when deleteReview is called with an invalid title
 */
test('Unsuccessful Delete', async () => {
    const {title, content, rating} = generateReview();
    generated1 = {title: title, content: content, rating: rating};
    collection = await model.getCollection();
    await collection.insertOne({title: generated1.title, content: generated1.content, rating: generated1.rating});
    


    expect(async () => {
        await model.deleteReview("Title");
    }).rejects.toThrow();

})