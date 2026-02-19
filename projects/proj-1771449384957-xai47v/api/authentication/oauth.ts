// OAuth authentication module for user registration and login

import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../models/user';
import { Result, ok, err } from '../utils/result';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// User registration
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Registration failed' });
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = user.generateAuthToken();
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// Google OAuth callback
router.post('/google', async (req, res) => {
    const { idToken } = req.body;
    const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    const user = await User.findOne({ email: payload.email });
    if (!user) {
        const newUser = new User({ email: payload.email });
        await newUser.save();
    }
    const token = user.generateAuthToken();
    res.status(200).json({ token });
});

export default router;