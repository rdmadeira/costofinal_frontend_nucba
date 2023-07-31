import useCostoAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useGetUser = (options) => {
  const userAxios = useCostoAxios();

  // Interceptors - para localStorage.getItem('authCF'):
  userAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('authCF');
    config.params = { token: token };
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
      console.log('Error', error);
      localStorage.removeItem('authCF');
      /* location.href = '/';  no va por que siempre recarga la pagina*/
    },

    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  return queryUser;
};

export default useGetUser;
