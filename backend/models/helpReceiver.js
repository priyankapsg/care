const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    fromTime: {
        type: String,
        required: true
    },
    toTime: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true,
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