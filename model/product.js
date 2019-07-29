'use strict';

const mongoose = require('mongoose');
// const Double = require('@mongoosejs/double');

const productSchema = new mongoose.Schema({
    picture: { type: String, required: true, default: 'http://placehold.it/200x200' },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false, default: '' },
    price: { type: Number, required: true, default: 0 },
    stock: { type: Number, required: true, default: 0 }
});
productSchema.path('name').index({text: true, default_language: 'english'});

module.exports = productSchema;
