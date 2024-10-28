const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    transactionHash: {
        type: String,
        required: true,
        unique: true
    },
    from: {
        type: Number,
        default: 0
    },
    to: {
        type: Number,
        default: 0
    },
    amount: {
        type: Number,
        default: 0
    },
    gasUsed: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Address', addressSchema);
