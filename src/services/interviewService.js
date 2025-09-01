import axios from 'axios';

const API_URL = 'http://localhost:8081/api/v1';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error("No token found. Please login again.");
  }
  return { 'Authorization': `Bearer ${token}` };
};

const getJobRoles = async () => {
  try {
    const response = await axios.get(API_URL + '/job-roles', { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error('[interviewService] Job roles fetch karne mein error aaya:', error.response || error.message);
    return [];
  }
};

const startInterview = async (jobRoleId) => {
  try {
    const response = await axios.post(API_URL + '/interviews/start', { jobRoleId }, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error('[interviewService] Interview shuru karne mein error aaya:', error.response || error.message);
    throw error;
  }
};

const getNextQuestion = async (interviewId) => {
  try {
    const response = await axios.get(`${API_URL}/interviews/${interviewId}/next-question`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error('[interviewService] Agla sawal fetch karne mein error aaya:', error.response || error.message);
    throw error;
  }
};

/**
 * NAYA FUNCTION: Jawab ko AI analysis ke liye submit karega.
 * @param {string} interviewId - Current interview ki ID.
 * @param {string} questionId - Jawab diye ja rahe sawal ki ID.
 * @param {string} answerText - User ka likha hua jawab.
 * @returns {Promise<Object>} - AI dwara diya gaya feedback aur score.
 */
const submitAndAnalyzeAnswer = async (interviewId, questionId, answerText) => {
  console.log(`[interviewService] Jawab ko AI analysis ke liye bhej rahe hain...`);
  try {
    const response = await axios.post(
      `${API_URL}/interviews/${interviewId}/analyze-text-answer`,
      { questionId, answerText }, 
      { headers: getAuthHeaders() }
    );
    console.log('[interviewService] AI analysis ka result mila:', response.data);
    return response.data;
  } catch (error) {
    console.error('[interviewService] Jawab submit karne mein error aaya:', error.response || error.message);
    throw error;
  }
};

export default {
  getJobRoles,
  startInterview,
  getNextQuestion,
  submitAndAnalyzeAnswer, 
};

