'use strict';

const Category = require('../model/category');

const fields = '_id name'; // fields to include in the query

/**
 * Get categories list
 * @param {Request} req Http request object
 * @param {Response} res Http response object
 */
async function getCategories(req, res) {
    await Category.find({}, (err, categories) => {
        if (err) return res.status(500).send({message: `Error getting the categories ${error.message}`});
        if(!categories) return res.status(404).send({message: `There is no categories yet`});

        res.status(200).send(categories);
    }).select(fields);
}

/**
 * Get a category by its id
 * @param {Request} req Http request object
 * @param {Response} res Http response object
 */
async function getCategory(req, res) {
    let categoryId = req.params.categoryId;

    await Category.findById(categoryId, (err, category) => {
        if (err) return res.status(500).send({message: `Error getting the category ${err.message}`});
        if(!category) return res.status(404).send({message: 'The category doesn\'t exist'});

        res.status(200).send(category);
    }).select(fields);
}

module.exports = {
    getCategories,
    getCategory
};