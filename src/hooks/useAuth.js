import useCostoAxios from './useAxios';
import { useMutation } from '@tanstack/react-query';

const useAuth = (isLogin) => {
  const authAxios = useCostoAxios();

  const mutateAuth = useMutation(
    {
      mutationKey: !isLogin ? ['signup'] : ['login'],
      mutationFn: async (data) => {
        console.log('dataOn useAuth 18', data);

        const auth = await authAxios.post(
          !isLogin ? 'auth/signup' : 'auth/login',
          {
            ...data,
          }
        );
        // Interceptors - para localStorage.setItem('auth', token)

        return auth;
      },
    },
    { refetchOnMount: false }
  );

  return mutateAuth;
};

export default useAuth;
