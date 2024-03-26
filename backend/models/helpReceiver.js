const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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

const helpModal = mongoose.model('Help', userSchema);
module.exports = helpModal;