'use strict';

const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    productId: String,
    qty: Number
});
const cartSchema = new mongoose.Schema({
    products: [productsSchema]
});

module.exports = mongoose.model('cart', cartSchema);