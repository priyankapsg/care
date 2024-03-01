const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    aadharNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false   
    },
    status: {
        type: Boolean,
        default: false   
    }
    
}, {
    timestamps: true
});

const userModal = mongoose.model('users', userSchema);

module.exports = userModal;
