// const nodemailer = require('nodemailer');
// const dotenv = require('dotenv').config();


// var transport = nodemailer.createTransport({
//     host: 'smtp.sendgrid.net',
//     port: 587,
//     auth: {
//         user: "apikey",
//         pass: process.env.SENDGRID_API_KEY
//     }
// });


// const sendmail = async(mailOptions) => await transport.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message sent: %s', info.messageId);
// });

// module.exports = sendmail;