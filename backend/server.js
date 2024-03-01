const express = require("express");
const cors = require("cors");
const nodemailer = require('nodemailer');

const app = express();
const dbconfig = require('./db');
const userRoute = require('./routes/userRoute');

app.use(express.json());
app.use(cors());

app.use('/api/user', userRoute);


// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'pandapk0418@gmail.com',
//     pass: `zhanleacnnmjdxgw`,
//   },
// });

// const sendOTP = async (email, otp) => {
//   try {
//     const mailOptions = {
//       from: 'pandapk0418@gmail.com',
//       to: email,
//       subject: 'CARELINKHUB OTP',
//       text: `Your OTP is: ${otp}`,
//     };

//     const info = await transporter.sendMail(mailOptions);

//     console.log('OTP sent successfully. Message ID:', info.messageId);
//   } catch (error) {
//         console.error('Error sending OTP:', error.message);
//   }
// };

// const userEmail = 'mani.bio.197@gmail.com'; // Replace with the user's email
// const otp = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a random 4-digit OTP

// sendOTP(userEmail, otp);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node server started on port ${port}`));


