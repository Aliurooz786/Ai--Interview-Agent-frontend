import axios from 'axios';

// Backend ka base URL yahan set kar dein
const API_BASE_URL = 'http://localhost:8090/api';

// Ek pre-configured axios instance banayein
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
