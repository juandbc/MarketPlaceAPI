'use strict';

const Category = require('../model/category');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const categorySchema = require('../model/category');

const unwindField = 'products'; // default unwind field for querys
const idField = '_id';
const patternField = 'name';

// project operator to get format product's document response
const projectProductJson = {
    _id: 0,
    id: `$${unwindField}.${idField}`,
    name: `$${unwindField}.name`,
    description: `$${unwindField}.description`,
    picture: `$${unwindField}.picture`,
    price: `$${unwindField}.price`,
    stock: `$${unwindField}.stock`
};


/**
 * Get products list
 * @param {Request} req Http request object
 * @param {Response} res Http response object
 */
async function getProducts(req, res) {
    if (req.query.name) {
        getProductsByName(req, res);
    } else {
        await Category.aggregate().unwind(unwindField).project(projectProductJson).then(products => {
            if (!products) return res.status(200).send({});

            res.status(200).send(products);
        }).catch(err => {
            return res.status(500).send({ message: `Error getting the products: ${err.message}` });
        });
    }
}

/**
 * Get products list by search pattern
 * @param {Request} req Http request object
 * @param {Response} res Http response object
 */
async function getProductsByName(req, res) {
    let pattern = new RegExp(req.query.name, 'i');
    let match = { [patternField]: pattern };

    await Category.aggregate().unwind(unwindField)
        .project(projectProductJson)
        .match(match)
        .then(products => {
            if (!products) return res.status(404).send({ message: 'There are no products for the term supplied.' });

            res.status(200).send(products);
        }).catch(err => {
            return res.status(500).send({ message: `Error getting the products: ${err.message}` });
        });
}

/**
 * Get a product by its id
 * @param {Request} req Http request object
 * @param {Response} res Http response object
 */
async function getProduct(req, res) {
    let productId = req.params.productId;
    console.log('ID to find: ' + productId);


    let matchQuery = { 'products._id': ObjectId(productId) }; // match operator to filter product
    let project = { products: 1 }; // project operator to get just the filter product's document

    await Category.aggregate().unwind(unwindField)
        .match(matchQuery)
        .project(project)
        .unwind(unwindField)
        .project(projectProductJson)
        .then(async function (product) {
            if (!product) return res.status(404).send({ message: 'The product doesn\'t exist' });

            res.status(200).send(product[0]);
        }).catch(err => {
            return res.status(500).send({ message: `Error getting the product: ${err.message}` });
        });
}

module.exports = {
    getProducts,
    getProductsByName,
    getProduct
};