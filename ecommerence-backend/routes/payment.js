const express = require('express');
const router = express.Router();
const payment = require('../models/payment');
const { auth, admin} = require('../middleware/auth');

// Create a new payment

router.post('/payment', auth, async (req, res) => {
    const { userId, orderId, amount, paymentMethod } = req.body;
    const paymentt = new payment({ userId, orderId, amount, paymentMethod });
    try {
        await paymentt.save();
        res.status(201).json({ message: 'Payment created successfully', paymentt });
    } catch (error) {
        res.status(400).json({ error: 'Error creating payment', details: error.message });
    }
});

// Get all payments (user and admin) by payment ID

router.get('/payment/:id', auth, async (req, res) => {
    const id = req.params.id;
    try {
        const paymentt = await payment.findById(id);
        if (!paymentt) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        const userId = req.user._id;
        if (paymentt.userId.toString() !== userId.toString() && !req.user.isAdmin) {
            return res.status(403).json({ error: 'Access denied' });
        }
        res.status(200).json({ message: 'Payment fetched successfully', paymentt });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching payment', details: error.message });
    }
});


// Get payments by order ID (admin only)
router.get('/payment/order/:id', admin, async (req, res) => {
    const id = req.params.id;
    try {
        const payments = await payment.find({ orderId: id });
        if (payments.length > 0) {
            res.status(200).json({ message: 'Payments fetched successfully', payments });
        } else {
            res.status(404).json({ error: 'No payments found for this order' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching payments', details: error.message });
    }
});

// Update payment status (admin only)

router.put('/payment/:paymentId', auth, admin, async (req, res) => {
    const paymentId = req.params.paymentId;
    const { status } = req.body;
    try {
        const paymentt = await payment.findByIdAndUpdate(paymentId, { status }, { new: true });
        if (paymentt) {
            res.status(200).json({ message: 'Payment status updated successfully', paymentt });
        } else {
            res.status(404).json({ error: 'Payment not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error updating payment status', details: error.message });
    }
});

// Delete payment (admin only)

router.delete('/payment/:paymentId', auth, admin, async (req, res) => {
    const paymentId = req.params.paymentId;
    try {
        const paymentt = await payment.findByIdAndDelete(paymentId);
        if (paymentt) {
            res.status(200).json({ message: 'Payment deleted successfully' });
        } else {
            res.status(404).json({ error: 'Payment not found' });
        }
        } catch (error) {
            res.status(500).json({ error: 'Error deleting payment', details: error.message });
        }
    });

module.exports = router;