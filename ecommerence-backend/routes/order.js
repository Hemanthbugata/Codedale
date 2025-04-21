const express = require('express');
const router = express.Router();
const order = require('../models/order');
const { auth, admin} = require('../middleware/auth');

// place order

router.post('/orders', auth, async (req, res) => {
    const { userId, cartItems, totalPrice } = req.body;
    const ordert = new order({ userId, cartItems, totalPrice });
    try {
        await ordert.save();
        res.status(201).json({ message: 'Order placed successfully', ordert });
    } catch (error) {
        res.status(400).json({ error: 'Error placing order', details: error.message });
    }
});

// get all orders (admin only)
router.get('/orders', auth, admin, async (req, res) => {
    try {
        const orders = await order.find().populate('userId', 'name email').populate('cartItems.productId', 'name price');
        res.status(200).json({ message: 'Orders fetched successfully', orders });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching orders', details: error.message });
    }
});

// get user's order history

router.get('/orders/user/:userId', auth, async (req, res) => {
    const userId = req.params.userId;
    try {
        const orders = await order.find({ userId }).populate('userId', 'name email').populate('cartItems.productId', 'name price');
        if (orders.length > 0) {
            res.status(200).json({ message: 'User orders fetched successfully', orders });
        } else {
            res.status(404).json({ error: 'No orders found for this user' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching user orders', details: error.message });
    }
});

// get a single order by ID user
router.get('/orders/:orderId', auth, async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const ordert = await order.findById(orderId).populate('userId', 'name email').populate('cartItems.productId', 'name price');
        if (ordert) {
            res.status(200).json({ message: 'Order fetched successfully', ordert });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching order', details: error.message });
    }
});

// update order status (admin only)
router.put('/orders/:orderId/status', auth, admin, async (req, res) => {
    const orderId = req.params.orderId;
    const { status } = req.body;
    try {
        const ordert = await order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (ordert) {
            res.status(200).json({ message: 'Order status updated successfully', ordert });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error updating order status', details: error.message });
    }
});

// cancel order (user and admin)
router.put('/orders/:orderId/cancel', auth, async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const ordert = await order.findByIdAndUpdate(orderId, { status: 'Cancelled' }, { new: true });
        if (ordert) {
            res.status(200).json({ message: 'Order cancelled successfully', ordert });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error cancelling order', details: error.message });
    }
});

// update shipping address

router.put('/orders/:orderId/address', auth, async (req, res) => {
    const orderId = req.params.orderId;
    const { shippingAddress } = req.body;
    try {
        const ordert = await order.findByIdAndUpdate(orderId, { shippingAddress }, { new: true });
        if (ordert) {
            res.status(200).json({ message: 'Shipping address updated successfully', ordert });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }   
    } catch (error) {
        res.status(400).json({ error: 'Error updating shipping address', details: error.message });
    }
});

// Track order (user and admin)
router.get('/orders/:orderId/track', auth, async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const ordert = await order.findById(orderId).populate('userId', 'name email').populate('cartItems.productId', 'name price');
        if (ordert) {
            res.status(200).json({ message: 'Order tracking details fetched successfully', ordert });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching order tracking details', details: error.message });
    }
});

module.exports = router;