const express = require("express");
const router = express.Router();
const User = require('../models/user')
const multer = require('multer');
// const OTPService = require('../services/otpService');
// const from = "Vonage APIs"
// const to = "917708426794"
// const text = 'A text message sent using the Vonage SMS API'
// async function sendSMS() {
//     await vonage.sms.send({to, from, text})
//         .then(resp => { console.log('Message sent successfully'); console.log(resp); })
//         .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
// }
// sendSMS();
// router.post("/verifyAadhar", async (req, res) => {
//     const { aadharNumber } = req.body;
//     try {
        
//         const isValidAadhar = true;
//         if (isValidAadhar) {
//             res.json({ success: true });
//         } else {
//             res.json({ success: false });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// router.post("/sendOTP", async (req, res) => {
//     const { aadharNumber } = req.body;
//     try {
        
//         const otp = OTPService.generateOTP(); 

//         const otpSent = OTPService.sendOTPToMobile(otp, aadharNumber); 

//         if (otpSent) {
           
//             res.json({ success: true });
//         } else {
            
//             res.json({ success: false });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
const upload = multer();

router.post("/register", upload.none(), async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber, aadharNumber, role } = req.body;
    try {
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            aadharNumber,
            role
        });
        const user = await newUser.save();
        res.send('User registered successfully');
    } catch (error) {
        return res.status(404).json({ error });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            const temp = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id,
            };
            res.send(temp);
        } else {
            return res.status(404).json({ message: 'Login Failed' });
        }
    } catch (error) {
        return res.status(404).json({ error });
    }
});

router.get('/getallusers', async (req, res) => {
    try {
        const nonadminusers = await User.find({ isAdmin: false });
        res.send(nonadminusers);

    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;


