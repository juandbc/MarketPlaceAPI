'use strict';

const express = require('express');
const categoryCtrl = require('../controller/category');
const productCtrl = require('../controller/product');
const cartCtrl = require('../controller/cart');

const api = express.Router();

api.get('/category/:categoryId', categoryCtrl.getCategory);
api.get('/category', categoryCtrl.getCategories);
api.get('/category/:categoryId/product?name', productCtrl.getProductsByName);
api.get('/product?name', productCtrl.getProductsByName);
api.get('/product', productCtrl.getProducts);
api.get('/product/:productId', productCtrl.getProduct);
api.get('/cart/:cartId', cartCtrl.getCart);
api.post('/cart', cartCtrl.saveCart);
api.put('/cart/:cartId', cartCtrl.addProduct);
api.delete('/cart/:cartId/product/:productId', cartCtrl.removeProduct);

module.exports = api;