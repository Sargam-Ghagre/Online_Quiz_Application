const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Question = require('../models/Question');

dotenv.config();

const seedQuestions = async () => {
  try {
    await connectDB();

    await Question.deleteMany({});

    const sampleQuestions = [
      {
        questionText: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Transfer Machine Language',
          'Hyperlinks and Text Markup Language',
          'Home Tool Markup Language',
        ],
        correctAnswerIndex: 0,
      },
      {
        questionText: 'Which JavaScript keyword is used to declare a block-scoped variable?',
        options: ['var', 'let', 'function', 'const'],
        correctAnswerIndex: 1,
      },
      {
        questionText: 'What is the purpose of MongoDB?',
        options: [
          'Frontend templating engine',
          'Relational database system',
          'NoSQL document database',
          'CSS preprocessor',
        ],
        correctAnswerIndex: 2,
      },
      {
        questionText: 'Which HTTP method is typically used to create a new resource?',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
        correctAnswerIndex: 1,
      },
    ];

    await Question.insertMany(sampleQuestions);
    console.log('Questions seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seedQuestions();
