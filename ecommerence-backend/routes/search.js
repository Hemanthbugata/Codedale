const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');
const { auth, admin } = require('../middleware/auth');

// 1. Search products by keyword
router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const results = await Product.find({
            name: { $regex: query, $options: 'i' }
        });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Search failed', details: error.message });
    }
});

// 2. Sort products by type 
router.get('/products/sort/:type', async (req, res) => {
    const { type } = req.params;
    let sortCriteria = {};

    if (type === 'price') sortCriteria = { price: 1 };
    else if (type === 'rating') sortCriteria = { rating: -1 };
    else return res.status(400).json({ error: 'Invalid sort type' });

    try {
        const sortedProducts = await Product.find().sort(sortCriteria);
        res.status(200).json(sortedProducts);
    } catch (error) {
        res.status(500).json({ error: 'Sorting failed', details: error.message });
    }
});

// 3. List of low stock items (admin only)
router.get('/products/low-stock', auth, admin, async (req, res) => {
    try {
        const lowStockProducts = await Product.find({ stock: { $lt: 5 } });
        res.status(200).json(lowStockProducts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch low stock products', details: error.message });
    }
});

// 4. Admin dashboard analytics (example: total users, total products, total orders)
router.get('/stats/dashboard', auth, admin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        res.status(200).json({
            totalUsers,
            totalProducts,
            totalOrders
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dashboard stats', details: error.message });
    }
});

// 5. Purchase history of a user
router.get('/user/:id/purchase-history', auth, async (req, res) => {
    try {
        const userId = req.params.id;
        const orders = await Order.find({ userId }).populate('products');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch purchase history', details: error.message });
    }
});

module.exports = router;
