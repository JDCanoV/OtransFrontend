// src/api/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:7229/api', // Ajusta si tu backend usa prefijo /api
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
