'use strict';

const Category = require('../model/category');

const unwindField = 'products';
const idField = '_id';
const patternField = 'name';

/**
 * Get products list
 * @param {Request} req Http request object
 * @param {Response} res Http response object
 */
async function getProducts(req, res) {
    await Category.aggregate([
        {
            $unwind: `$${unwindField}`
        },
        {
            $project: {
                _id: 0, name: `$${unwindField}.name`,
                description: `$${unwindField}.description`,
                picture: `$${unwindField}.picture`,
                price: `$${unwindField}.price`,
                stock: `$${unwindField}.stock`
            }
        }]).then(products => {
            if (!products) return res.status(200).send({});

            res.status(200).send(products);
        }).catch(err => {
            return res.status(500).send({ message: `Error getting the products: ${err.message}` });
        });
}

/**
 * Get products list by search pattern
 * @param {Request} req Http request object
 * @param {Response} res Http response object
 */
async function getProductsByName(req, res) {
    let pattern = req.params.pattern;
    let match = `${unwindField}.${patternField}`;

    Category.aggregate([{ $unwind: `$${unwindField}` }, { $match: { [match]: pattern } }])
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
    let match = `${unwindField}.${idField}`;

    await Category.aggregate([{ $unwind: `$${unwindField}` }, { $match: { [match]: productId } }])
        .then(async function (product) {
            if (!product) return res.status(404).send({ message: 'The product doesn\'t exist' });

            res.status(200).send(product);
        }).catch(err => {
            return res.status(500).send({ message: `Error getting the product: ${err.message}` });
        });
}

module.exports = {
    getProducts,
    getProductsByName,
    getProduct
};