// src/plugins/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // or wherever your JSON server is
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
