import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3001/api" : "/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // <-- Add this line
});

export default api;