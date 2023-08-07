import axios from 'axios';
import { useMemo } from 'react';

const useCostoAxios = () => {
  const costoAxios = useMemo(() => {
    const costoAxios = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    costoAxios.interceptors.request.use((config) => {
      const token = localStorage.getItem('authCF') || null;

      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }

      return config;
    });
    return costoAxios;
  }, []);

  return costoAxios;
};

export default useCostoAxios;
