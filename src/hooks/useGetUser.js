import useCostoAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useGetUser = (options) => {
  const userAxios = useCostoAxios();

  userAxios.interceptors.request.use((config) => {
    if (options && options.complete) {
      config.params = { ...config.params, complete: true };
    }

    return config;
  });

  const queryUser = useQuery({
    // En este caso, tuve que usar el parametro 'options' como variable acá (el segundo item del array de queryKey), para que vuelva a refetchear cuando el parametro es usado!!!!!!!!!!!
    queryKey: ['user', options],
    queryFn: async () => {
      const user = await userAxios(`users`);

      return user;
    },
    onError: (error) => {
      console.log('error', error);

      localStorage.removeItem('authCF');
    },
    retry: (failureCount, error) => {
      console.log('failureCount', failureCount);
      console.log('error', error);
      return failureCount < 2 && error.response.status === 401;
    },
    retryDelay: 1000,
    staleTime: 60 * 60 * 1000,
    cacheTime: 60 * 60 * 1000 + 10 * 60 * 1000,
  });

  return queryUser;
};

export default useGetUser;
