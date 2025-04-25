// src/api/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5077/api', // Ajusta si tu backend usa prefijo /api
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
