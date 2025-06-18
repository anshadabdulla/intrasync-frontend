import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust to match your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
