const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {JWT_SECRET} = require('../config');

const User = require('../models/user');
const { auth, admin} = require('../middleware/auth');

router.post('/signup',  async (req, res) => {
    const { name, email, password,role,address } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({ name, email, password, role, address });
        await user.save();
        res.status(201).json({ Message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).send(error);
    }
}
);

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.json({ token, user: { _id: user._id, name: user.name, email: user.email, role: user.role, address: user.address } });
    } catch (error) {
        console.error("💥 LOGIN ERROR:", error); 
        res.status(500).json({ error: 'Server error' });
    }
});


router.get('/users', auth, admin, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({ message: 'Users fetched successfully', users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/users/:id', auth,admin, async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});



router.put('/users/:id', auth, async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password; 
        user.role = req.body.role || user.role;
        user.address = req.body.address || user.address;
        await user.save();
        res.json({message: 'User updated successfully', user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });



router.delete('/users/:id', auth, admin, async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if(user){
        res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });

router.put('/users/:id/role', auth, admin, async (req, res) => {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if(user){
        res.json({ message: 'User role updated successfully', user });
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
});

router.get('/users/:id/address', auth, admin, async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        res.json({ address: user.address });
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;
