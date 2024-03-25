const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    timeSlot: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    comments: {
        type: String
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