import axios from "axios";

const API_URL = "https://appointment-booking-cklb.onrender.com";

export const getDoctors = async () => axios.get(`${API_URL}/doctors`);
export const getAvailableSlots = async (doctorId, date) => 
    axios.get(`${API_URL}/doctors/${doctorId}/slots?date=${date}`);
export const bookAppointment = async (data) => {
    return axios.post(`${API_URL}/appointments`, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json", // Ensure JSON format
      },
    });
  };
export const getUserAppointments = async () => axios.get(`${API_URL}/appointments`);
export const cancelAppointment = async (id) => axios.delete(`${API_URL}/appointments/${id}`);
export const updateAppointment = async (id, data) => axios.put(`${API_URL}/appointments/${id}`, data);
export const deleteAppointment = async (id, data) => axios.delete(`${API_URL}/appointments/${id}`,data);
