const express = require('express');
const Question = require('../models/Question');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

router.get('/questions', protect, async (req, res) => {
  try {
    const questions = await Question.find().lean();
    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch questions.' });
  }
});

router.post('/quiz/submit', protect, async (req, res) => {
  try {
    const { score, totalQuestions, percentage } = req.body;

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        history: {
          score,
          totalQuestions,
          percentage,
          date: new Date(),
        },
      },
    });

    res.status(200).json({ message: 'Quiz submitted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save quiz result.' });
  }
});

module.exports = router;
