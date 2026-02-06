const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase-admin');
const verifyToken = require('../middleware/auth');

// Register user - Create user profile in Firestore
router.post('/register', verifyToken, async (req, res) => {
    try {
        const { fullName, email } = req.body;
        const uid = req.user.uid;

        // Check if user already exists
        const userDoc = await db.collection('users').doc(uid).get();
        if (userDoc.exists) {
            return res.status(400).json({ error: 'User already registered' });
        }

        // Create user document
        await db.collection('users').doc(uid).set({
            uid,
            fullName,
            email,
            createdAt: new Date(),
            hasAttempted: false
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// Check if user has already attempted the exam
router.get('/check-attempt', verifyToken, async (req, res) => {
    try {
        const uid = req.user.uid;

        const userDoc = await db.collection('users').doc(uid).get();

        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userData = userDoc.data();
        res.json({ hasAttempted: userData.hasAttempted || false });
    } catch (error) {
        console.error('Check attempt error:', error);
        res.status(500).json({ error: 'Failed to check attempt status' });
    }
});

module.exports = router;
