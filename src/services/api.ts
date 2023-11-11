import axios from "axios"
import { useAuthStore } from "@/stores/auth";



// Dev URL
const baseURL = 'http://0.0.0.0:80/api/v1';

const api = axios.create({
  baseURL
});

api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = authStore.token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;