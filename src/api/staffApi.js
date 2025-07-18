import axiosInstance from "./axiosConfig";

const BASE_URL = "/api/staff";

const getAllStaff = () => axiosInstance.get(BASE_URL);
const createStaff = (data) => axiosInstance.post(BASE_URL, data);
const updateStaff = (id, data) => axiosInstance.put(`${BASE_URL}/${id}`, data);
const deleteStaff = (id) => axiosInstance.delete(`${BASE_URL}/${id}`);
const assignPermissions = (id, permissions) => {
  return axiosInstance.post(`/api/staff/permissions/${id}`, permissions, {
    headers: {
      "Content-Type": "application/json", 
    },
  });
};


export default {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  assignPermissions,
};
