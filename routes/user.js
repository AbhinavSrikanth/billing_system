const express=require('express');
const router = express.Router();
const path=require('path')
const { User,Product, Service } = require('../models');
const calculateTax = require('../utils/calculateTax');


// POST /api/users - Create a new user account
router.post('/', async (req, res) => {
    try {
        const { username, email } = req.body;
        const newUser = await User.create({ username, email });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Route to get a list of all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// Route to get a specific user by ID
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
});

module.exports = router;