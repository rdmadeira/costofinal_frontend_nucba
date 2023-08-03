import useCostoAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useGetOrders = () => {
  const userAxios = useCostoAxios();

  // Interceptors - para localStorage.getItem('authCF'):
  userAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('authCF');

    config.params = { token: token };

    return config;
  });

  const queryUser = useQuery({
    // En este caso, tuve que usar el parametro 'options' como variable acá (el segundo item del array de queryKey), para que vuelva a refetchear cuando el parametro es usado!!!!!!!!!!!
    queryKey: ['order'],
    queryFn: async () => {
      const orders = await userAxios(`orders`);

      return orders;
    },

    refetchOnMount: true,
  });

  return queryUser;
};

export default useGetOrders;
