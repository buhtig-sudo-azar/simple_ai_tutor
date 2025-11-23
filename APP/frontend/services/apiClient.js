
// apiClient.js
import axios from 'axios';

// Для разработки используем относительный путь (работает через proxy)
// Для продакшена - полный URL из .env
const API_BASE_URL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_URL;

console.log('API Base URL:', API_BASE_URL);
console.log('Environment:', import.meta.env.MODE);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});