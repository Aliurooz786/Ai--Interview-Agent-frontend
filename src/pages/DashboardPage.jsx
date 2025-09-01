import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // <-- Link ko import karein
import interviewService from '../services/interviewService';

function DashboardPage() {
  const [jobRoles, setJobRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isStarting, setIsStarting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobRoles = async () => {
      setIsLoading(true);
      try {
        const roles = await interviewService.getJobRoles();
        if (roles && roles.length > 0) {
          setJobRoles(roles);
          setSelectedRole(roles[0].id);
        } else {
          // Ab yeh error nahi, balki ek message hai.
          console.log("No pre-defined job roles found, which is okay.");
        }
      } catch (err) {
        console.error("Job roles fetch karne mein galti hui:", err);
        setError("Could not connect to the server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobRoles();
  }, []);

  const handleStartInterview = async () => {
    if (!selectedRole) {
      alert('Please select a job role to start the interview.');
      return;
    }
    setIsStarting(true);
    try {
      const interviewData = await interviewService.startInterview(selectedRole);
      navigate(`/interview/${interviewData.interviewId}`);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Could not start interview.";
      console.error("Interview shuru nahi ho paya:", errorMessage);
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsStarting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-xl text-teal-400 animate-pulse">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-16 sm:pt-20">
      <h1 className="text-4xl font-bold text-teal-400 mb-10">Choose Your Path</h1>
      
      <div className="w-full max-w-2xl space-y-8">
        
        {/* OPTION 1: Pre-defined Interview */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Practice with Pre-defined Roles</h2>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : jobRoles.length > 0 ? (
            <>
              <div className="mb-6">
                <label htmlFor="job-role" className="block text-lg font-medium text-gray-300 mb-2">
                  Choose a Job Role
                </label>
                <select
                  id="job-role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  disabled={isStarting}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {jobRoles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.title}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleStartInterview}
                disabled={isStarting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 text-lg disabled:bg-gray-500"
              >
                {isStarting ? 'Starting...' : 'Start Standard Interview'}
              </button>
            </>
          ) : (
            <p className="text-gray-400">No pre-defined roles available.</p>
          )}
        </div>

        {/* Divider */}
        <div className="text-center text-gray-500 font-bold">OR</div>

        {/* NAYA SECTION - OPTION 2: Smart Interview */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Create a Custom AI Interview</h2>
          <p className="text-gray-400 mb-6">
            Use a real Job Description and Resume to generate a personalized, smart interview.
          </p>
          <Link 
            to="/generate-interview" 
            className="w-full inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 text-lg"
          >
            Generate a Smart Interview
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

