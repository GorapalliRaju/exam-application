
const express = require('express');
const jwt = require('jsonwebtoken');
const Question = require('../models/Question');
const router = express.Router();

function verifyToken(req, res, next) {
    const bearer = req.headers.authorization;
    if (!bearer) return res.sendStatus(403);
    const token = bearer.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

router.get('/questions', verifyToken, async (req, res) => {
    const questions = await Question.aggregate([{ $sample: { size: 10 } }]);
    res.json(questions.map(q => ({ ...q, answer: undefined })));
});

router.post('/add-question', verifyToken, async (req, res) => {
    const { question, options, answer } = req.body;

    if (
        !question ||
        !Array.isArray(options) ||
        typeof answer !== 'number' ||
        options.length < 2 ||
        answer < 0 ||
        answer >= options.length
    ) {
        return res.status(400).json({ message: 'Invalid question format' });
    }

    try {
        const newQuestion = new Question({ question, options, answer });
        await newQuestion.save();
        res.status(201).json({ message: 'Question added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/submit', verifyToken, async (req, res) => {
    const submitted = req.body.answers;
    const ids = submitted.map(a => a._id);
    const correct = await Question.find({ _id: { $in: ids } });
    let score = 0;
    submitted.forEach(sub => {
        const match = correct.find(q => q._id.toString() === sub._id);
        if (match && match.answer === sub.answer) score++;
    });
    res.json({ score });
});

module.exports = router;
