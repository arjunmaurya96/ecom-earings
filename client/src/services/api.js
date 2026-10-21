import axios from 'axios';

/** Backend API – Step 7 se use hoga. URL: client/.env → VITE_API_URL */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

export default api;
