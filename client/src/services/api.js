import axios from 'axios';

// Use an explicit environment variable for deployment. If not provided,
// default to the currently deployed Render backend so Vercel can work
// without extra client-side code changes.
const API_BASE_URL = process.env.REACT_APP_API_URL ?? 'https://online-quiz-application-dy17.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const fetchQuestions = async (token) => {
  const response = await api.get('/questions', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const submitQuizResult = async (token, payload) => {
  const response = await api.post('/quiz/submit', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
