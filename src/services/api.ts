
import axios from "axios"

// Dev URL
const baseURL = 'http://0.0.0.0:80/api/v1';

const api = axios.create({
  baseURL
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;