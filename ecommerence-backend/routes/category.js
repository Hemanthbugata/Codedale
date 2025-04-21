const express = require('express');
const router = express.Router();
const Categoryy = require('../models/category');
const { auth, admin} = require('../middleware/auth');

// Create a new category
router.post('/categories', auth, admin, async (req, res) => {
    const { name, description } = req.body;
    const category = new Categoryy(req.body);
    try {
        await category.save();
        res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
        res.status(400).json({ error: 'Error creating category', details: error.message });
    }
});

// Get all categories

router.get('/categories', async (req, res) => {
    try {
        const categories = await Categoryy.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching categories', details: error.message });
    }
});

// Get category by ID

router.get('/categories/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const category = await Categoryy.findById(id);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching category', details: error.message });
    }
});

// Update category by ID

router.put('/categories/:id', auth, admin, async (req, res) => {
    const id = req.params.id;
    try {
        const category = await Categoryy.findByIdAndUpdate(id, req.body, { new: true });
        if (category) {
            res.status(200).json({ message: 'Category updated successfully', category });
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error updating category', details: error.message });
    }
});

// Delete category by ID

router.delete('/categories/:id', auth, admin, async (req, res) => {
    const id = req.params.id;
    try {
        const category = await Categoryy.findByIdAndDelete(id);
        if (category) {
            res.status(200).json({ message: 'Category deleted successfully' });
        }
        else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting category', details: error.message });
    }
});

module.exports = router;