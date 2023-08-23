const router = require('express').Router();
const Product =require('../models/product');
const Service=require('../models/services'); 
const CartItems = require('../models/cart');
const { User } = require('../models');
const calculateTax = require('../utils/calculateTax');

// Add a product to the cart
router.post('/addproduct', async (req, res) => {
    try {
        const { user_email, productname, quantity } = req.body;
        console.log(req.body)

        const user = await User.findOne({ where: { email: user_email } });
        if (!user) {
            return res.status(400).json({ message: 'User email not found. Please create an account to place an order.' });
        }

        const product = await Product.findOne({ where: { name: productname } });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cartItem = await CartItems.create({
            user_email,
            productname,
            quantity,
        });

        res.status(201).json(cartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add a service to the cart
router.post('/addservice', async (req, res) => {
    try {
        const { user_email, servicename, quantity } = req.body;
        console.log(req.body)

        const user = await User.findOne({ where: { email: user_email } });
        if (!user) {
            return res.status(400).json({ message: 'User email not found. Please create an account to place an order.' });
        }
        
        const service = await Service.findOne({ where: { name: servicename } });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        const cartItem = await CartItems.create({
            user_email,
            servicename,
            quantity,
        });

        res.status(201).json(cartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Remove a product from the cart using its product name
router.delete('/removeproduct/:productname', async (req, res) => {
    try {
        const productname = req.params.productname;
        const user_email = req.body.user_email;

        // Find the cart item based on product name
        const cartItem = await CartItems.findOne({
            where: { user_email, productname },
            include: [{ model: Product, as:'Product' }],
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart Item not found' });
        }

        // Delete the cart item
        await cartItem.destroy();

        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Remove a service from the cart using its service name
router.delete('/removeservice/:servicename', async (req, res) => {
    try {
        const servicename = req.params.servicename;
        const user_email = req.body.user_email;

        // Find the cart item based on service name
        const cartItem = await CartItems.findOne({
            where: { user_email, servicename },
            include: [{ model: Service, as:'Service' }],
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart Item not found' });
        }

        // Delete the cart item
        await cartItem.destroy();

        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Clear a user's cart based on email
router.delete('/clearcart', async (req, res) => {
    try {
        const userEmail = req.body.user_email;

        // Delete all cart items associated with the specified user email
        await CartItems.destroy({ where: { user_email: userEmail } });

        res.status(200).json({ message: 'Cart items successfully cleared' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

    
// View total bill for a particular cart
router.get('/totalbill', async (req, res) => {
    try {
        const user_email = req.body.user_email;
        // Find the cart items for the specified user
        const cartItems = await CartItems.findAll({
            where: { user_email },
            include: [
                { model:Product,as: 'Product' },
                { model:Service,as:'Service'},
            ],
        });

        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({ message: 'Cart is empty' });
        }

        // Calculate the total bill and tax for the cart
        let totalBill = 0;
        const itemsWithTotal = cartItems.map(item => {
            const itemType = item.Product ? 'product' : 'service';
            const itemTotal = item.quantity * (item.Product ? item.Product.price : item.Service.price);
            const itemTax = calculateTax(itemTotal, itemType);
            totalBill += itemTotal + itemTax;

            return {
                itemname: item.Product ? item.Product.name : item.Service.name,
                price: item.Product ? item.Product.price : item.Service.price,
                quantity: item.quantity,
                tax: itemTax,
                total: itemTotal + itemTax,
            };
        });
        res.status(200).json({ totalBill, items: itemsWithTotal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


CartItems.belongsTo(Product, { foreignKey: 'productname', targetKey: 'name', as: 'Product' });
CartItems.belongsTo(Service, { foreignKey: 'servicename', targetKey: 'name', as: 'Service' });

module.exports = router;
