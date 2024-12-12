const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const router = express.Router();

router.post('/register', async (req, res) => {
    const {email, password} = req.body;

    const existingUser = await User.findOne({email});
    if (existingUser) {
        return res.status(400).json({message: 'Email already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        email,
        password: hashedPassword
    });

    try {
        await user.save();
        res.status(201).json({message: 'User registered successfully'});
    }
    catch (e) {
        res.status(500).json( {message: 'Internal Server Error'});
    }
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) {
        return res.status(400).json({message: 'Invalid credentials'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(400).json({message: 'Invalid credentials'});
    }

    const token = jwt.sign(
        { id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: '1h'});

    res.json( {token});
});

router.get('/verify', (req,res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if(!token) {
        return res.status(401).json({message: 'Access Denied: No Token Provided'});
    }
    try{
        return res.status(200).json({ message: 'Token is valid'})
    }
    catch (e) {
        return res.status(401).json( { message: 'Invalid Token' });
    }
})

module.exports = router;