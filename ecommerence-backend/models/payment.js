const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    paymentId: String,
    amountPaid: Number,
    status: {type: String, default: 'Pending'},
    paymentMethod: String,
    paidAt: Date,
  });
  
  module.exports = mongoose.model('payment', paymentSchema);
  