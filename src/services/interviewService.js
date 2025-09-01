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
    console.error('[interviewService] Job roles fetch karne mein error aaya:', error.response?.data?.message || error.message);
    return [];
  }
};

const startInterview = async (jobRoleId) => {
  try {
    const response = await axios.post(API_URL + '/interviews/start', { jobRoleId }, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error('[interviewService] Interview shuru karne mein error aaya:', error.response?.data?.message || error.message);
    throw error;
  }
};

const getNextQuestion = async (interviewId) => {
  try {
    const response = await axios.get(`${API_URL}/interviews/${interviewId}/next-question`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error('[interviewService] Agla sawal fetch karne mein error aaya:', error.response?.data?.message || error.message);
    throw error;
  }
};

const submitAndAnalyzeAnswer = async (interviewId, questionId, answerText) => {
  try {
    const response = await axios.post(
      `${API_URL}/interviews/${interviewId}/analyze-text-answer`,
      { questionId, answerText },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error('[interviewService] Jawab submit karne mein error aaya:', error.response?.data?.message || error.message);
    throw error;
  }
};


const getInterviewResults = async (interviewId) => {
  console.log(`[interviewService] Interview [${interviewId}] ke results fetch kar rahe hain...`);
  try {
    const response = await axios.get(`${API_URL}/interviews/${interviewId}/results`, {
      headers: getAuthHeaders()
    });
    console.log('[interviewService] Results safaltapoorvak mil gaye:', response.data);
    return response.data;
  } catch (error) {
    console.error('[interviewService] Results fetch karne mein error aaya:', error.response?.data?.message || error.message);
    throw error;
  }
};

export default {
  getJobRoles,
  startInterview,
  getNextQuestion,
  submitAndAnalyzeAnswer,
  getInterviewResults, 
};

