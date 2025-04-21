const express = require('express');
const router = express.Router();
const review = require('../models/review');
const { auth, admin} = require('../middleware/auth');


// Create a new review
router.post('/reviews', auth, async (req, res) => {
    const { userId, productId, rating, comment } = req.body;
    const reviewt = new review({ userId, productId, rating, comment });
    try {
        await reviewt.save();
        res.status(201).json({ message: 'Review created successfully', reviewt });
    } catch (error) {
        res.status(400).json({ error: 'Error creating review', details: error.message });
    }
});

// Get all reviews for product
router.get('/reviews/product/:productId', auth ,async (req, res) => {
    const productId = req.params.productId;
    try {
        const reviews = await review.find({ productId }).populate('userId', 'name email');
        res.status(200).json({ message: 'Reviews fetched successfully', reviews });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching reviews', details: error.message });
    }
});

// Get reviews by user

router.get('/reviews/user/:userId', auth, async (req, res) => {
    const userId = req.params.userId;
    try {
        const reviews = await review.find({ userId }).populate('productId', 'name price');
        if (reviews.length > 0) {
            res.status(200).json({ message: 'User reviews fetched successfully', reviews });
        } else {
            res.status(404).json({ error: 'No reviews found for this user' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user reviews', details: error.message });
    }
});

// Edit a revier by review ID

router.put('/reviews/:reviewId', auth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const { rating, comment } = req.body;
    try {
        const reviewt = await review.findByIdAndUpdate(reviewId, { rating, comment }, { new: true });
        if (reviewt) {
            res.status(200).json({ message: 'Review updated successfully', reviewt });
        } else {
            res.status(404).json({ error: 'Review not found' });
        }   
    } catch (error) {
        res.status(400).json({ error: 'Error updating review', details: error.message });
    }
});

// Delete a review by review ID
router.delete('/reviews/:reviewId', auth, async (req, res) => {
    const reviewId = req.params.reviewId;
    try {
        const reviewt = await review.findByIdAndDelete(reviewId);
        if (reviewt) {
            res.status(200).json({ message: 'Review deleted successfully', reviewt });
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting review', details: error.message });
    }
});

module.exports = router;