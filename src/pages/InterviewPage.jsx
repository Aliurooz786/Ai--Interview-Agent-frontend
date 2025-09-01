import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import interviewService from '../services/interviewService';

function InterviewPage() {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [lastFeedback, setLastFeedback] = useState(null);

  const fetchQuestion = useCallback(async () => {
    setIsLoading(true);
    setLastFeedback(null);
    setError('');
    console.log(`[InterviewPage] Interview [${interviewId}] ke liye agla sawal fetch kar rahe hain...`);
    try {
      const data = await interviewService.getNextQuestion(interviewId);
      if (data.message && data.message.includes("completed")) {
        alert("Congratulations, the interview is complete! You will now see your final results.");
        navigate(`/results/${interviewId}`);
      } else {
        setQuestion(data);
      }
    } catch (err) {
      console.error("Sawal fetch karne mein galti hui:", err);
      const errorMessage = err.response?.data?.message || "Could not load the next question. Please refresh the page.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [interviewId, navigate]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  const handleSubmitAnswer = async () => {
    if (!question || !question.questionId) {
      alert("The question is not loaded properly. Please wait or refresh.");
      return;
    }
    if (!answer.trim()) {
      alert("Please provide an answer before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      const analysisResult = await interviewService.submitAndAnalyzeAnswer(
        interviewId,
        question.questionId,
        answer
      );
      setLastFeedback(analysisResult);
      setAnswer('');
      await fetchQuestion();
    } catch (error) {
      console.error("Jawab submit karne mein error aaya:", error);
      alert("Could not submit your answer. Please check the console and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-xl text-teal-400 animate-pulse">Loading next question...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 text-center">
        <div>
          <h2 className="text-2xl text-red-500 mb-4">An Error Occurred</h2>
          <p className="text-lg text-gray-300 bg-gray-800 p-4 rounded-md">{error}</p>
          <button onClick={() => navigate('/dashboard')} className="mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        
        {lastFeedback && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6 border-l-4 border-teal-500 animate-fade-in">
            <h3 className="font-bold text-teal-400">AI Feedback on your last answer:</h3>
            <p className="text-gray-300 mt-2">{lastFeedback.feedback}</p>
            <p className="text-yellow-400 font-semibold mt-2">Score: {lastFeedback.score}</p>
          </div>
        )}

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Question: {question?.questionType}</p>
            <h2 className="text-3xl font-bold text-teal-300 mt-2">{question?.questionText}</h2>
          </div>
          
          <div className="mb-6">
            <label htmlFor="answer" className="block text-lg font-medium text-gray-300 mb-2">
              Your Answer
            </label>
            <textarea
              id="answer"
              rows="8"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus-outline-none focus:ring-2 focus:ring-teal-500 transition"
              placeholder="Type your answer here..."
              disabled={isSubmitting || isLoading}
            />
          </div>

          <button
            onClick={handleSubmitAnswer}
            disabled={isSubmitting || isLoading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Analyzing...' : 'Submit and Get Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterviewPage;

