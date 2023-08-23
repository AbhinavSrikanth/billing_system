const express = require('express');
const router = express.Router();
const Product  = require('../models/product');
const calculateTax = require('../utils/calculateTax');

router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

router.post('/', async (req, res) => {
    const { name, price } = req.body;
    try {
        const newProduct = await Product.create({ name, price });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error adding product' });
    }
});

Product.prototype.calculateTax = function() {
    return calculateTax(this.price, 'product');
};

module.exports = router;