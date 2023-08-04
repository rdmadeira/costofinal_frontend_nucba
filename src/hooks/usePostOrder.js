import useCostoAxios from './useAxios';
import { useMutation } from '@tanstack/react-query';

const usePostUser = () => {
  const userAxios = useCostoAxios();

  const mutateOrderResponse = useMutation({
    // En este caso, tuve que usar el parametro 'options' como variable acá (el segundo item del array de queryKey), para que vuelva a refetchear cuando el parametro es usado!!!!!!!!!!!
    mutationKey: ['order'],
    mutationFn: async (data) => {
      const order = await userAxios.post(`orders`, { ...data });

      return order;
    },
  });

  return mutateOrderResponse;
};

export default usePostUser;
