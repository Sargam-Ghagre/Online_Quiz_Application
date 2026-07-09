const Question = require('../models/Question');
const User = require('../models/User');

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({}).lean();

    const safeQuestions = questions.map((q) => ({
      _id: q._id,
      question: q.question,
      options: q.options
    }));

    res.status(200).json({
      questions: safeQuestions
    });
  } catch (error) {
    console.error('Get questions error:', error);
    res.status(500).json({
      message: 'Server error while fetching questions.'
    });
  }
};

const submitQuiz = async (req, res) => {
  try {
    const answers = req.body.answers || req.body;

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({
        message: 'Answers object is required.'
      });
    }

    const questions = await Question.find({}).lean();

    if (!questions.length) {
      return res.status(404).json({
        message: 'No questions found.'
      });
    }

    let score = 0;

    questions.forEach((question) => {
      const questionId = question._id.toString();
      const userAnswer = answers[questionId];

      if (
        userAnswer !== undefined &&
        String(userAnswer) === String(question.correctAnswerIndex)
      ) {
        score += 1;
      }
    });

    const totalQuestions = questions.length;
    const percentage = totalQuestions > 0
      ? ((score / totalQuestions) * 100).toFixed(2)
      : 0;

    const result = {
      date: new Date(),
      score,
      totalQuestions,
      percentage: Number(percentage)
    };

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found.'
      });
    }

    if (!Array.isArray(user.history)) {
      user.history = [];
    }

    user.history.push(result);
    await user.save();

    res.status(200).json({
      message: 'Quiz submitted successfully.',
      score,
      percentage: Number(percentage),
      totalQuestions
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({
      message: 'Server error while submitting quiz.'
    });
  }
};

module.exports = {
  getQuestions,
  submitQuiz
};