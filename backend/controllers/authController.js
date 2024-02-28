import User from "../models/user.js";

export const register = async (req, res, next) => {
    try {
        console.log("RESP", req.body);
        const newUser = new User({...req.body});
        await newUser.save();
        res.status(200).send("User has been created.");
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email,password:req.body.password });
        if (!user) return res.status(400).send('User not found!');
        return res.status(200).json(user._doc);
    } catch (err) {
        next(err);
    }
};