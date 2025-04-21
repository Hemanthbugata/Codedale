const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    rating: Number,
    comment: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('review', orderSchema);