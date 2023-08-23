const express = require('express');
const router = express.Router();
const { Service }= require('../models'); 
const CartItems=require('./cart');

const calculateTax = require('../utils/calculateTax');


// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching services' });
  }
});

// Create a new service
router.post('/', async (req, res) => {
  const { name, price } = req.body;

  try {
    const newService = await Services.create({ name, price });
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: 'Error creating service' });
  }
});

Service.prototype.calculateTax = function() {
  return calculateTax(this.price, 'service');
};


module.exports = router;
