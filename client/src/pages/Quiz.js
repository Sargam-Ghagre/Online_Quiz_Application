import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuestions, submitQuizResult } from '../services/api';
import { useAuth } from '../context/AuthContext';

const QUESTION_TIME = 60;

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions(token);
        setQuestions(data.questions || []);
      } catch (err) {
        setError('Unable to load questions right now.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadQuestions();
    }
  }, [token]);

  useEffect(() => {
    if (loading || questions.length === 0) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, loading, questions.length]);

  const currentQuestion = questions[currentIndex];

  const selectedAnswer = useMemo(() => answers[currentQuestion?._id], [answers, currentQuestion]);

  const handleAnswerSelect = (optionIndex) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion._id]: optionIndex }));
  };

  const handleSubmit = async () => {
    try {
      const score = questions.reduce((total, question) => {
        return total + (answers[question._id] === question.correctAnswerIndex ? 1 : 0);
      }, 0);

      const totalQuestions = questions.length;
      const percentage = totalQuestions ? Math.round((score / totalQuestions) * 100) : 0;

      await submitQuizResult(token, { score, totalQuestions, percentage });
      navigate('/results', { state: { score, totalQuestions, percentage } });
    } catch (err) {
      setError('Your quiz could not be submitted.');
    }
  };

  const goToNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">Loading questions...</div>;
  }

  if (!currentQuestion) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">No questions available.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">Quiz in progress</p>
            <h1 className="text-3xl font-semibold">Question {currentIndex + 1} of {questions.length}</h1>
          </div>
          <div className="rounded-full border border-rose-400/40 bg-rose-500/10 px-4 py-2 font-semibold text-rose-300">
            Time left: {timeLeft}s
          </div>
        </div>

        {error && <div className="mb-4 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</div>}

        <div className="rounded-2xl border border-slate-700 bg-slate-800/80 p-6">
          <h2 className="text-xl font-semibold">{currentQuestion.questionText}</h2>
          <div className="mt-6 grid gap-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              return (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(index)}
                  className={`rounded-xl border px-4 py-3 text-left transition ${isSelected ? 'border-cyan-500 bg-cyan-500/10 text-cyan-200' : 'border-slate-600 bg-slate-900 text-slate-200 hover:border-cyan-400'}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-between gap-3">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="rounded-xl border border-slate-600 px-5 py-3 font-semibold text-slate-200 transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <div className="flex gap-3">
            {currentIndex < questions.length - 1 ? (
              <button
                onClick={goToNext}
                className="rounded-xl bg-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-600"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-400"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
