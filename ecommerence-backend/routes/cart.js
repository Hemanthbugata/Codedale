const express = require('express');
const router = express.Router();
const Cartt = require('../models/cart');
const { auth, admin } = require('../middleware/auth');

// add item to cart

router.post('/cart/add', auth, async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const cartItem = new Cartt({ userId, productId, quantity,totalPrice: 0 });
        await cartItem.save();
        res.status(201).json({ message: 'Item added to cart successfully', cartItem });
    } catch (error) {
        res.status(400).json({ error: 'Error adding item to cart', details: error.message });
    }
});

// remove item from cart

router.delete('/cart/remove/:productId', auth, async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;
    try {
        const cartItem = await Cartt.findOneAndDelete({ userId, productId });
        if (cartItem) {
            res.status(200).json({ message: 'Item removed from cart successfully', cartItem });
        } else {
            res.status(404).json({ error: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error removing item from cart', details: error.message });
    }
});

// update item quantity in cart

router.put('/cart/update/:productId', auth, async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user._id;
    try {
        const cartItem = await Cartt.findOneAndUpdate({ userId, productId }, { quantity }, {
            new: true,
        });
        if (cartItem) {
            res.status(200).json({ message: 'Item quantity updated successfully', cartItem });
        }
        else {
            res.status(404).json({ error: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating item quantity in cart', details: error.message });
    }
});

// get all items in cart

router.get('/cart', auth, async (req, res) => {
    try{
        const userId = req.user._id;
        const cartItems = await Cartt.find({ userId });
        res.status(200).json({ cartItems });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cart items', details: error.message });

    }
});

// clear entire cart

router.delete('/cart/clear', auth, async (req, res) => {
    const userId = req.user._id;
    try {
        await Cartt.deleteMany({ userId });
        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error clearing cart', details: error.message });
    }
});

// Manually update cart total

router.put('/cart/update-total', auth, async (req, res) => {
    const userId = req.user._id;
    const { totalPrice } = req.body;
    try {
        const cartItems = await Cartt.find({ userId });
        if (cartItems.length > 0) {
            await Cartt.updateMany({ userId }, { totalPrice });
            res.status(200).json({ message: 'Cart total updated successfully', totalPrice });
        }
        else {
            res.status(404).json({ error: 'No items found in cart' });
        }
        } catch (error) {
        res.status(500).json({ error: 'Error updating cart total', details: error.message });
    }   
});

module.exports = router;