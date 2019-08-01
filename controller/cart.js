'use strict';

const Cart = require('../model/cart');
// const Product = require('../model/product');

/**
 * Get a shopping cart by its id
 * @param {Request} req Http request object
 * @param {Response} res Http response object
 */
async function getCart(req, res) {
    let cartId = req.params.cartId;

    Cart.findById(cartId, (err, cart) => {
        if (err) return res.status(500).send({ message: `Error getting the cart: ${err.message}` });
        if (!cart) return res.status(404).send({ message: 'The cart doesn\'t exist' });

        res.status(200).send(cart);
    });
}

/**
 * Create a new shopping cart
 * @param {Request} req Http request object
 * @param {Response} res Http response object
 */
async function saveCart(req, res) {
    // let cart = new Cart();
    // cart.items.push(req.body);

    await Cart.create({items: [req.body]},(err, cartStored) => {
        if (err) return res.status(500).send({ message: `Error getting the cart: ${err.message}` });
        if (!cartStored) return res.status(404).send({ message: 'The cart doesn\'t exist' });

        res.status(200).send({ cart: cartStored });
    });
}

/**
 * Add product to the shopping cart
 * @param {Request} req Http request object
 * @param {Response} res Http response object
 */
async function addProduct(req, res) {
    let cartId = req.params.cartId;
    let product = req.body;

    await Cart.findById(cartId, (err, cartStored) => {
        if (err) return res.status(500).send({ message: `Error getting the cart: ${err.message}` });
        if (!cartStored) return res.status(404).send({ message: 'The cart doesn\'t exist' });

        cartStored.items.push(product);
        cartStored.save(err => {
            if (err) return res.status(500).send({ message: `Error adding the product: ${err.message}` });
            
            res.status(200).send({ cart: cartStored });
        });        
    });
}

/**
 * Remove a product from shopping cart
 * @param {Request} req Http request object
 * @param {Response} res Http response object
 */
async function removeProduct(req, res) {
    let cartId = req.params.cartId;
    let productId = req.params.productId;

    await Cart.findById(cartId, (err, cartStored) => {
        if (err) return res.status(500).send({ message: `Error getting the cart: ${err.message}` });
        if (!cartStored) return res.status(404).send({ message: 'The cart doesn\'t exist' });

        cartStored.items.id(productId).remove();
        cartStored.save(err => {
            if (err) return res.status(500).send({ message: `Error removing the product: ${err.message}` });
            
            res.status(200).send({ message: 'The product was removed' });
        });
    });
}

module.exports = { getCart, saveCart, addProduct, removeProduct };