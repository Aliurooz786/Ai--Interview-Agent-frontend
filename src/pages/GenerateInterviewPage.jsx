import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import interviewService from '../services/interviewService';

function GenerateInterviewPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false); // Naya state button ke liye
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!jobDescription.trim() || !resumeText.trim()) {
      alert("Please provide both the Job Description and the Resume.");
      return;
    }

    setIsGenerating(true);
    console.log("JD aur Resume ke saath interview generate kar rahe hain...");

    try {
      // Messenger ko kaam par lagao
      const interviewData = await interviewService.generateAndStartInterview(jobDescription, resumeText);
      const newInterviewId = interviewData.interviewId;
      console.log('Naya AI interview ban gaya, ID:', newInterviewId);

      // User ko "Interview Room" page par bhej do
      navigate(`/interview/${newInterviewId}`);

    } catch (error) {
      // Backend se mile a-to-z sahi error message ko dikhao
      const errorMessage = error.response?.data?.message || "Could not generate the interview at this time. Please check the server logs.";
      console.error("Interview generate karne mein error aaya:", error);
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-teal-400 text-center mb-2">Generate a Smart Interview</h1>
        <p className="text-center text-gray-400 mb-8">
          Paste the Job Description and Resume, and our AI will create a custom interview.
        </p>

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl space-y-6">
          <div>
            <label htmlFor="job-description" className="block text-lg font-medium text-gray-300 mb-2">
              Job Description
            </label>
            <textarea
              id="job-description"
              rows="8"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              placeholder="Paste the full job description here..."
              disabled={isGenerating}
            />
          </div>

          <div>
            <label htmlFor="resume-text" className="block text-lg font-medium text-gray-300 mb-2">
              Candidate's Resume
            </label>
            <textarea
              id="resume-text"
              rows="8"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              placeholder="Paste the candidate's resume text here..."
              disabled={isGenerating}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Link to="/dashboard" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-md transition duration-300">
              Cancel
            </Link>
            <button
              onClick={handleSubmit}
              disabled={isGenerating}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating...' : 'Generate & Start Interview'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateInterviewPage;

