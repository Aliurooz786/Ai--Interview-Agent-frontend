import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import interviewService from '../services/interviewService';

function ResultsPage() {
  const { interviewId } = useParams();
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      console.log(`[ResultsPage] Interview [${interviewId}] ke results fetch kar rahe hain...`);
      try {
        const data = await interviewService.getInterviewResults(interviewId);
        setResults(data);
      } catch (err) {
        console.error("Results fetch karne mein galti hui:", err);
        setError("Could not load the interview results. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [interviewId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-xl text-teal-400 animate-pulse">Generating your final report...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-teal-400 text-center mb-2">Interview Report</h1>
        <p className="text-center text-gray-400 mb-8">Role: {results?.jobRoleTitle}</p>

        <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Overall Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Status</p>
              <p className="text-lg font-semibold text-green-400">{results?.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Overall Score</p>
              <p className="text-lg font-semibold text-yellow-400">{results?.overallScore ?? 'Pending'}</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">Question Analysis</h2>
        <div className="space-y-4">
          {results?.results?.map((item, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-xl">
              <p className="text-lg font-semibold text-teal-300 mb-2">Q{index + 1}: {item.questionText}</p>
              <div className="border-l-4 border-gray-700 pl-4">
                <p className="text-sm text-gray-400">AI Feedback</p>
                <p className="text-gray-300 italic mt-1">{item.feedback}</p>
                <p className="text-yellow-400 font-semibold mt-2">Score: {item.score}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link to="/dashboard" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;

