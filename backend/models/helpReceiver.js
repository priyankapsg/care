const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    timeduration: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false   
    }
}, {
    timestamps: true
});

const userModal = mongoose.model('help', userSchema);
module.exports = userModal;