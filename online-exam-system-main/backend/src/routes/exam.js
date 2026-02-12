const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase-admin');
const verifyToken = require('../middleware/auth');
const questions = require('../data/questions');

// Get all questions (without correct answers)
router.get('/questions', verifyToken, async (req, res) => {
    try {
        const uid = req.user.uid;

        // Check if user has already attempted
        const userDoc = await db.collection('users').doc(uid).get();
        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (userDoc.data().hasAttempted) {
            return res.status(403).json({ error: 'You have already attempted this exam' });
        }

        // Return questions without correct answers
        const questionsWithoutAnswers = questions.map(q => ({
            id: q.id,
            section: q.section,
            question: q.question,
            options: q.options
        }));

        res.json({ questions: questionsWithoutAnswers });
    } catch (error) {
        console.error('Get questions error:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
});

// Submit exam answers and calculate score
router.post('/submit', verifyToken, async (req, res) => {
    try {
        const { answers, timeTaken } = req.body; // answers is an array of selected option indices
        const uid = req.user.uid;

        // Check if user has already attempted
        const userDoc = await db.collection('users').doc(uid).get();
        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (userDoc.data().hasAttempted) {
            return res.status(403).json({ error: 'You have already attempted this exam' });
        }

        // Calculate scores and detailed answer analysis
        let totalScore = 0;
        let correctCount = 0;
        let wrongCount = 0;
        const sectionScores = {
            aptitude: 0,
            programming: 0,
            problemSolving: 0,
            logicalReasoning: 0
        };

        // Detailed answer analysis
        const answerDetails = questions.map((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === question.correctAnswer;

            if (isCorrect) {
                totalScore++;
                correctCount++;

                // Update section-wise scores
                const section = question.section.toLowerCase().replace(/\s+/g, '');
                if (section === 'aptitude') sectionScores.aptitude++;
                else if (section === 'programming') sectionScores.programming++;
                else if (section === 'problemsolving') sectionScores.problemSolving++;
                else if (section === 'logicalreasoning') sectionScores.logicalReasoning++;
            } else {
                wrongCount++;
            }

            return {
                questionId: question.id,
                section: question.section,
                question: question.question,
                options: question.options,
                userAnswer: userAnswer !== null ? userAnswer : -1, // -1 for unanswered
                correctAnswer: question.correctAnswer,
                isCorrect: isCorrect,
                isAnswered: userAnswer !== null
            };
        });

        // Store result in Firestore with detailed analysis
        await db.collection('results').doc(uid).set({
            userId: uid,
            totalScore,
            correctCount,
            wrongCount,
            sectionScores,
            timeTaken,
            answers,
            answerDetails, // Store detailed answer analysis
            submittedAt: new Date()
        });

        // Mark user as attempted
        await db.collection('users').doc(uid).update({
            hasAttempted: true
        });

        res.json({
            message: 'Exam submitted successfully',
            totalScore,
            correctCount,
            wrongCount,
            sectionScores,
            timeTaken,
            answerDetails // Send detailed analysis to frontend
        });
    } catch (error) {
        console.error('Submit exam error:', error);
        res.status(500).json({ error: 'Failed to submit exam' });
    }
});

module.exports = router;
