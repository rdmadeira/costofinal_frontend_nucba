import axios from 'axios';
import { useMemo } from 'react';

const CostoAxios = () => {
  const costoAxios = useMemo(() => {
    const costoAxios = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    costoAxios.interceptors.request.use((config) => {
      const token = JSON.parse(localStorage.getItem('authCF')) || null;

      config.headers.Authorization = 'Bearer ' + token || null;

      return config;
    });
    return costoAxios;
  }, []);

  return costoAxios;
};

export default CostoAxios;
