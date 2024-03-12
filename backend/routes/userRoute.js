const express = require("express");
const router = express.Router();
const User = require('../models/user')
const multer = require('multer');
const nodemailer = require('nodemailer');
const upload = multer();

router.post("/register", upload.none(), async (req, res) => {
  try {
      const { firstName, lastName, email, password, phoneNumber, aadharNumber, role, file } = req.body;
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'pandapk0418@gmail.com',
          pass: `zhanleacnnmjdxgw`,
        },
      });      
      
      const sendOTP = async (email, otp) => {
        try {
          const mailOptions = {
            from: 'pandapk0418@gmail.com',
            to: email,
            subject: 'CARELINKHUB OTP',
            text: `Your OTP is: ${otp}`,
          };
      
          const info = await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('error:', error.message);
            return res.status(500).json({ msg : 'Something went wrong on our end. Please try again later' });
          }
      };
      const otp = Math.floor(1000 + Math.random() * 9000).toString();      
      sendOTP(email, otp);

      const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            aadharNumber,
            role,
            file,
            otp
        });
        await newUser.save();
        return res.status(200).json({ msg : "Success! You're now registered, Check your email for the OTP" });
      } catch (error) { 
      console.error('error:', error);
      return res.status(500).json({ msg : 'Something went wrong on our end. Please try again later' });
    }
});

router.post("/otp", async (req, res) => {
  try {
      const { email, otp } = req.body;  
      const user = await User.findOne({ email, otp });
  
      if (user) {
        if(user.isAdmin === true){
          return res.status(200).json({ status : "admin", msg : 'Your OTP has been confirmed, Please Login' });
        } else if (user.isAdmin === false && user.status === false) {
          return res.status(200).json({ status : "nonUser", msg : 'Your OTP has been confirmed, and Admin will approve it soon. Please wait patiently' });
        } else {
          return res.status(200).json({ status : "user", msg : 'Your OTP has been confirmed, Please Login' });
        }
      } else {
        return res.status(400).json({ msg : 'Verification code is incorrect. Please try again' });
      }
    } catch (error) {
      console.error('error:', error);
      return res.status(500).json({ msg : 'Something went wrong on our end. Please try again later' });
    }
});
  
router.post("/login", async (req, res) => {
  try {
      const { email, password } = req.body;  
      const user = await User.findOne({ email, password });
  
      if (user) {
        if(user.isAdmin === true){
          return res.status(200).json({ status : "admin", msg : 'Login successfully' });
        } else if (user.isAdmin === false && user.status === false) {
          return res.status(200).json({ status : "nonUser", data: user.id, msg : 'Admin will approve it soon. Please wait patiently' });
        } else {
          return res.status(200).json({ status : user.role, data: user.id, msg : 'Login successfully' });
        }
      } else {
        return res.status(400).json({ msg : 'Email / Password is incorrect. Please try again' });
      }
    } catch (error) {
      console.error('error:', error);
      return res.status(500).json({ msg : 'Something went wrong on our end. Please try again later' });
    }
});
 
router.get('/getallusers', async (req, res) => {
    try {
        const nonadminusers = await User.find({ isAdmin: false });
        return res.status(200).json(nonadminusers);
    } catch (error) {
      console.error('error:', error);
      return res.status(500).json({ msg : 'Something went wrong on our end. Please try again later' });
    }
});

router.put('/update', async (req, res) => {
    try {
      const { email, status } = req.body;
      const filter = { email };
      const update = {
        $set: { status }
      };
      const updatedStatus = await User.findOneAndUpdate(filter, update, { new: true });  
      if (!updatedStatus) {
        return res.status(500).json({ msg : 'Something went wrong on our end. Please try again later' });
      }
      res.status(200).json({ msg : 'User approved successfully'});
    } catch (error) {
      console.error('error:', error);
      return res.status(500).json({ msg : 'Something went wrong on our end. Please try again later' });
    }
});

router.get('/getProfile/:id', async (req, res) => {
  try {
      const user = await User.findOne({ _id : req.params.id });
      return res.status(200).json(user);
  } catch (error) {
    console.error('error:', error);
    return res.status(500).json({ msg : 'Something went wrong on our end. Please try again later' });
  }
});

module.exports = router;