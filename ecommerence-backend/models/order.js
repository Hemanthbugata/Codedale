const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items:[{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
    }],
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        pincode: String,
        country : String
    },
    paymentMethod: String,
    paymentStatus: {type: String,default: 'Pending'},
    orderStatus: {type: String,default: 'Pending'},
    totalPrice: Number,
    placedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('order', orderSchema);
    