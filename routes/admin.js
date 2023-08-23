const express = require('express');
const router = express.Router();
const { Order } = require('../models'); // Make sure to import the necessary models

// To view all orders from the order page
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.findAll({attributes: ['id', 'total_amount', 'order_date','createdAt', 'updatedAt','user_email']}); // Use the correct model name (e.g., Order)
        
        res.status(200).json(orders);

    } catch (error)
    {
        console.error(error);
        res.status(500).json({ message: 'Cannot Retrieve orders' });
    }
});

module.exports = router;
