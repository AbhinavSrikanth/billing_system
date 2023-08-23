const express = require('express');
const bodyParser = require('body-parser');
const{Sequelize,DataTypes}=require('sequelize');
require('dotenv').config();

Object.keys(require.cache).forEach(key => {
    if (key.includes('./models') || key.includes('./routes')) {
      delete require.cache[key];
    }
  });


const app = express();
app.use(bodyParser.json());
app.use(express.json());

const sequelize = new Sequelize('billing_system', 'whirldata', 'Whirldata@123', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
});

const {Admin, CartItems, Order, Product, Service, User} = require("./models");

// Define associations
// User.hasMany(CartItems);
CartItems.belongsTo(User, {
    foreignKey: 'user_email',
});

// product routes
const productsRoutes = require('./routes/product');
app.use('/api/products', productsRoutes);
app.post('/api/users', async (req, res) => {
    const { username, email } = req.body;
    try {
        const newUser = await User.create({ username, email });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});


//cart_items routes
const cartRoutes = require('./routes/cart');
app.use('/api/cart', cartRoutes);


//user routes
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);


//services route
const servicesRoutes = require('./routes/services');
app.use('/api/services', servicesRoutes);


//order route
const orderRoutes = require('./routes/order');
app.use('/api/orders', orderRoutes);


//admin routes
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);
(async () => {
    await sequelize.sync();
    console.log('Database tables synced');
})();

const port=process.env.PORT || 5000;
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});