const nodemailer = require('nodemailer');
const { move } = require('../routes/order');

console.log(process.env.EMAIL_USERNAME) 


const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail'
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });  


module.exports=transporter;