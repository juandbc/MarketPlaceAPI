'use strict';

const mongoose = require('mongoose');
const productSchema = require('./product');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    products: { type: [productSchema], required: false }
});

module.exports = mongoose.model('category', categorySchema);