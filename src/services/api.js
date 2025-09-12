import axios from 'axios';


const API_BASE_URL = 'http://localhost:8090/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAllTrainers = () => apiClient.get('/public/trainers');


export const loginUser = (credentials) => apiClient.post('/auth/login', credentials);

export const registerUser = (userData) => apiClient.post('/auth/register', userData);

