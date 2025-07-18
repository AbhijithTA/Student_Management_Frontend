import axiosInstance from "./axiosConfig";
const API_URL = '/api/auth'; 

const register = async (userData) => {
  const response = await axiosInstance.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (credentials) => {
  const response = await axiosInstance.post(`${API_URL}/login`, credentials);
  return {
    user: response.data.user,
    token: response.data.token
  };
};

const getMe = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axiosInstance.get(`${API_URL}/me`, config);
  return response.data;
};

const logout = async () => {
  localStorage.removeItem('token');
};

export default {
  register,
  login,
  getMe,
  logout,
};