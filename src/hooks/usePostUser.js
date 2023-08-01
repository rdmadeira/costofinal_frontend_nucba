import useCostoAxios from './useAxios';
import { useMutation } from '@tanstack/react-query';

const usePostUser = () => {
  const userAxios = useCostoAxios();

  const mutateUserResponse = useMutation({
    // En este caso, tuve que usar el parametro 'options' como variable acá (el segundo item del array de queryKey), para que vuelva a refetchear cuando el parametro es usado!!!!!!!!!!!
    mutationKey: ['user'],
    mutationFn: async (data) => {
      const user = await userAxios.post(`users`, { ...data });

      return user;
    },
  });

  return mutateUserResponse;
};

export default usePostUser;
