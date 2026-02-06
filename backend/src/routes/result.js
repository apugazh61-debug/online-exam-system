const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase-admin');
const verifyToken = require('../middleware/auth');

// Get user's exam result
router.get('/:userId', verifyToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const requestingUserId = req.user.uid;

        // Users can only view their own results
        if (userId !== requestingUserId) {
            return res.status(403).json({ error: 'Unauthorized to view this result' });
        }

        const resultDoc = await db.collection('results').doc(userId).get();

        if (!resultDoc.exists) {
            return res.status(404).json({ error: 'Result not found' });
        }

        const result = resultDoc.data();
        res.json({
            totalScore: result.totalScore,
            sectionScores: result.sectionScores,
            timeTaken: result.timeTaken,
            submittedAt: result.submittedAt
        });
    } catch (error) {
        console.error('Get result error:', error);
        res.status(500).json({ error: 'Failed to fetch result' });
    }
});

module.exports = router;
