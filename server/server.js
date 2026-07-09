const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api', quizRoutes);

app.get('/', (req, res) => {
  res.send('Online Quiz API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
