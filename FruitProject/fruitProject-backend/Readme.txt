Initialize
-----------------------------------------------
Npm init
Npm I mongodb jest dotenv validator mongodb-memory-server express express-list-endpoints pino pinohttp supertest cors body-parser



Creates fruits
-----------------------------------------------
HTTP METHOD: POST
http://localhost:1339/fruits/

In body/raw/json:
{"fruitName":"Avocado", "fruitVitamin":"A","fruitCalories":"52"}


Find fruits
-----------------------------------------------
HTTP METHOD: GET
http://localhost:1339/fruits/Coconut



Find all fruits
-----------------------------------------------
HTTP METHOD: GET
http://localhost:1339/fruits/


Update fruits
-----------------------------------------------
HTTP METHOD: PUT
http://localhost:1339/fruits/

In body/raw/json:
{"oldFruitName":"Avocado","newFruitName":"Avocado", "fruitVitamin":"B","fruitCalories":"52"}


Delete fruits
-----------------------------------------------
HTTP METHOD: DELETE
http://localhost:1339/fruits/Avocado
