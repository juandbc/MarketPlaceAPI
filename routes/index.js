'use strict';

const express = require('express');
const categoryCtrl = require('../controller/category');
const productCtrl = require('../controller/product');
const cartCtrl = require('../controller/cart');

const api = express.Router();

//enable CORS
api.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

api.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello world! This is a API made in NodeJS & ExpressJS.' });
})
api.get('/categories/:categoryId', categoryCtrl.getCategory);
api.get('/categories', categoryCtrl.getCategories);
api.get('/products?name', productCtrl.getProductsByName);
api.get('/products', productCtrl.getProducts);
api.get('/products/:productId', productCtrl.getProduct);
api.get('/carts/:cartId', cartCtrl.getCart);
api.post('/carts', cartCtrl.saveCart);
api.put('/carts/:cartId', cartCtrl.addProduct);
api.delete('/carts/:cartId', cartCtrl.removeProduct);

module.exports = api;