import axiosInstance from './axiosConfig';

const API_URL = '/api/students';

const getAllStudents = () => {
  return axiosInstance.get(API_URL);
};

const createStudent = (studentData) => {
  return axiosInstance.post(API_URL, studentData);
};

const updateStudent = (id, studentData) => {
  return axiosInstance.put(`${API_URL}/${id}`, studentData);
};

const deleteStudent = (id) => {
  return axiosInstance.delete(`${API_URL}/${id}`);
};

export default {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};