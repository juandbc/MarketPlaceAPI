'use strict';

const mongoose = require('mongoose');
const productSchema = require('./product');

const cartSchema = new mongoose.Schema({
    items: {
        type: [productSchema],
        required: false
    }
});

module.exports = mongoose.model('cart', cartSchema);