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

api.get('/categories/:categoryId', categoryCtrl.getCategory);
api.get('/categories', categoryCtrl.getCategories);
api.get('/categories/:categoryId/product?name', productCtrl.getProductsByName);
api.get('/products?name', productCtrl.getProductsByName);
api.get('/products', productCtrl.getProducts);
api.get('/products/:productId', productCtrl.getProduct);
api.get('/cart/:cartId', cartCtrl.getCart);
api.post('/cart', cartCtrl.saveCart);
api.put('/cart/:cartId', cartCtrl.addProduct);
api.delete('/cart/:cartId/product/:productId', cartCtrl.removeProduct);

module.exports = api;