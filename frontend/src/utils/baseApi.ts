import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Add auth token to requests
api.interceptors.request.use((config) => {
  const idToken = localStorage.getItem('idToken');
  if (idToken) {
    config.headers.Authorization = `Bearer ${idToken}`;
  }
  return config;
});

export { geminiKey };
export default api;