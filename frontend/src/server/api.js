// src/api/axios.js
// src/api.js
import axios from 'axios';

const API = axios.create({
  // baseURL: '/api', // Proxy prefix
  baseURL: "http://localhost:5000",
});

export default API;