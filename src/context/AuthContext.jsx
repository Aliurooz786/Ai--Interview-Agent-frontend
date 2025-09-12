import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {

    if (token) {
      setUser({ token });
    }
  }, [token]);

  const handleLogin = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      const { jwtToken } = response.data;
      setToken(jwtToken);
      setUser({ token: jwtToken });
      localStorage.setItem('token', jwtToken);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleRegister = async (userData) => {
    try {
      await registerUser(userData);
      navigate('/login');
      alert('Registration successful! Please log in.');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const value = {
    user,
    token,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  return useContext(AuthContext);
};
