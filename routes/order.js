const express = require('express');
const router = express.Router();
const { Order, CartItems, User } = require('../models');
const transporter=require('../config/emailConfig');

// Place an order
router.post('/placeorder', async (req, res) => {
    try {
      const user_email = req.body.user_email;
  
      // Calculate the total purchase amount
      const cartItems = await CartItems.findAll({
        where: {
          user_email: user_email
        },
        include:['Product','Service']
      });
  
      let totalProductPrice = 0;
      let totalServicePrice = 0;
  
      for (const item of cartItems) {
        if (item.Product) {
          totalProductPrice += item.quantity * item.Product.price;
        } else if (item.Service) {
          totalServicePrice += item.quantity * item.Service.price;
        }
      }
  
      const totalPurchaseAmount = totalProductPrice + totalServicePrice;
  
      // Create an order to store the purchase information
      const order = await Order.create({
        total_amount: totalPurchaseAmount,
        order_date: new Date(),
        user_email: user_email
      });
  
      const mailOptions = {
        from: 'abhinavsrikanth01@gmail.com',
        to: user_email,
        subject: 'Congratulations! Your Order is Placed Successfully',
        text: `Your order with ID ${order.id} has been placed successfully.\n Total purchase amount for your order: $${totalPurchaseAmount} \nThank You for your purchase!`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Email sending error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      const jsonResponse = {
        orderID: order.id,
        totalPurchaseAmount: totalPurchaseAmount,
        message: 'Thank you for the purchase! Check your email for more details.'
      };
      res.json(jsonResponse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while calculating the purchase.' });
    }
  });

Order.belongsTo(User, { foreignKey: 'user_email', targetKey: 'email', as: 'User' });

module.exports = router;