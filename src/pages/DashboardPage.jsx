import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
      console.log('[Dashboard] Job roles fetch karne ja rahe hain...');
      try {
        const roles = await interviewService.getJobRoles();
        if (roles && roles.length > 0) {
          setJobRoles(roles);
          setSelectedRole(roles[0].id);
        } else {
          setError("No job roles found. Please ask an admin to create one.");
        }
      } catch (err) {
        console.error("Job roles fetch karne mein galti hui:", err);
        setError("Could not connect to the server to fetch job roles.");
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
    console.log(`Interview shuru kiya ja raha hai... Role ID: ${selectedRole}`);
    
    try {
      const interviewData = await interviewService.startInterview(selectedRole);
      const newInterviewId = interviewData.interviewId;
      console.log('Naya interview ban gaya, ID:', newInterviewId);
      navigate(`/interview/${newInterviewId}`);

    } catch (error) {
      console.error("Interview shuru nahi ho paya:", error);
      
      // NAYA, SMART ERROR HANDLING
      // Backend ke response se a-to-z sahi error message nikalo
      const errorMessage = error.response?.data?.message || "Could not start the interview. Please try again later.";
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-20">
      <h1 className="text-4xl font-bold text-teal-400 mb-10">Select Your Interview</h1>
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-xl">
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
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isStarting ? 'Starting...' : 'Start Interview'}
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;

