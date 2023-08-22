# Orizon_Travel
<p align="left"> <img src="https://komarev.com/ghpvc/?username=patriziatriglione&label=Profile%20views&color=0e75b6&style=flat" alt="patriziatriglione" /> </p>

Orizon is a project created for Start2Impact to finish the course on Node.js. 
The project required to create a RESTful JSON API for a travel company.

## Index
1. Description
2. Istructions
3. API
5. Example
6. Badges


## Description
This project was done only in the back-end, creating APIs that could recall products, users and orders (made up of products and users).
The task was to create APIs that could also modify, delete or insert products, orders and users, also allowing you to filter orders based on date or product type.

For the project, [Node.js](https://nodejs.org/it) and its [Express](https://expressjs.com/) framework were used.

It was also used:
- [Dotenv](https://www.npmjs.com/package/dotenv) for environment variables;
- [http-status-codes](https://www.npmjs.com/package/http-status-codes) for statuses;
- [Validator](https://www.npmjs.com/package/validator) to validate or not the email change in user;
- [Mongoose](https://www.npmjs.com/package/mongoose) and [Mondodb](https://www.npmjs.com/package/mongodb) for working with the MongoDB database;
- [Postman](https://www.postman.com/downloads/), a platform that allows you to make GET/POST calls etc, useful for working with APIs only in the back-end
- Also, to avoid having to always start the server, [Nodemon](https://www.npmjs.com/package/nodemon) was used.

## Istructions
- Download the project from Github by going to __<>Code -> Download ZIP__ or you can clone it.
- Open the file and make sure you have Node on your pc. If not, you can download it from its [official website](https://nodejs.org/it)
- Create an account (if you don't already have one) on [MongoDb Atlas](https://www.mongodb.com/cloud/atlas/register) (it's an online database and free).
- Create your new database and remember your name and password carefully, you will need them for the next step
- Go to __Connect -> Drivers__ and in the third step you have a string to copy and paste from the __.env_example___ file.
Paste, enter your password instead of __<password>__, enter the port number, and rename the file to __.env__.
- Install dependencies with:
  ```
  npm install 
  ```
- Then just start the server with:
   ```
   npm start
   ```
   Or, if you prefer to use Nodemon to have a server that updates automatically, type:
   ```
   npm run dev
   ```
- To try bees, you can download [Postman](https://www.postman.com/downloads/) for free. Once installed, create a new collection and you can start making your calls!
    Just type __localhost:5000__ (with Port = 5000) and then enter the API
    (ex: __GET localhost:5000/api/products__ to get all products)

  ## API
  ### Products
| Method  | API               | Result                |
|---------|-------------------|-----------------------|
|  GET    |  api/products     | products list         |   
|  GET    |  api/products/:id | show only one product |   
|  POST   | api/products      | create a product      |   
|  PATCH  | api/products/:id  | modify a product      |
|  DELETE | api/products/:id  | delete a product      |
#### Filter for Pagination
| Method  | API                        | Result                                      |
|---------|----------------------------|---------------------------------------------|
|  GET    |  api/products?perPage=2    | how many results should be on a page        |   
|  GET    |  api/products?page=2       | page number                                 |   


### Users
| Method  | API               | Result                |
|---------|-------------------|-----------------------|
|  GET    |  api/users        | users list            |   
|  GET    |  api/users/:id    | show only one user    |   
|  POST   | api/users         | create a user         |   
|  PATCH  | api/users/:id     | modify a user         |
|  DELETE | api/users/:id     | delete a user         |
#### Filter for Pagination
| Method  | API                        | Result                                      |
|---------|----------------------------|---------------------------------------------|
|  GET    |  api/users?perPage=2       | how many results should be on a page        |   
|  GET    |  api/users?page=2          | page number                                 | 


### Orders
| Method  | API               | Result                |
|---------|-------------------|-----------------------|
|  GET    |  api/orders       | orders list           |   
|  GET    |  api/orders/:id   | show only one order   |   
|  POST   | api/orders        | create a oder         |   
|  PATCH  | api/orders/:id    | modify a order        |
|  DELETE | api/orders/:id    | delete a order        |

### Filter Orders
| Method  | API                                                    | Result                                                        |
|---------|--------------------------------------------------------|---------------------------------------------------------------|
|  GET    |  api/orders?date=YYYY-MM-GG                            | list of orders on a date                                      |   
|  GET    |  api/orders?name=ProductName                           | list of orders from the name of the searched product          |   
|  GET    | api/orders?sort=asc                                    | list of orders from oldest to newest                          |
|  GET    | api/orders?sort=desc                                   | list of orders from newest to oldest                          |
|  GET    | api/orders?sort=asc&sortField=updatedAt                | list from oldest to newest of modified orders                 |
|  GET    | api/orders?sort=desc&sortField=updatedAt               | list from  newest to oldest of modified orders                |
#### Filter for Pagination
| Method  | API                        | Result                                      |
|---------|----------------------------|---------------------------------------------|
|  GET    |  api/orders?perPage=2      | how many results should be on a page        |   
|  GET    |  api/orders?page=2         | page number                                 | 

## Example
#### Products
![example_products](https://github.com/patriziatriglione/Orizon_Travel/blob/main/images/products_example.gif?raw=true)

#### Users
![example_users](https://github.com/patriziatriglione/Orizon_Travel/blob/main/images/users_example.gif?raw=true)

#### Orders
![example_orders](https://github.com/patriziatriglione/Orizon_Travel/blob/main/images/order_example.gif?raw=true)

#### Oders - Filter
![example_filter](https://github.com/patriziatriglione/Orizon_Travel/blob/main/images/filterOrder_example.gif?raw=true)



## Badges

<h3 align="left">Connect with me:</h3>
<p align="left">
<a href="https://linkedin.com/in/patrizia triglione" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="patrizia triglione" height="30" width="40" /></a>
<a href="https://fb.com/patrizia triglione" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/facebook.svg" alt="patrizia triglione" height="30" width="40" /></a>
<a href="https://instagram.com/patrizia_triglione_" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" alt="patrizia_triglione_" height="30" width="40" /></a>
</p>

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> </p>

<h3 align="left">Support:</h3>
<p><a href="https://www.buymeacoffee.com/patrizia triglione"> <img align="left" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="patrizia triglione" /></a></p><br><br>


