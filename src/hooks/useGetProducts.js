import useCostoAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useGetProducts = (categoryPath) => {
  const CostoAxios = useCostoAxios();

  const productsByCat = useQuery({
    queryKey: ['productsByCat', categoryPath],
    queryFn: async () => {
      const productsByCat = await CostoAxios(
        categoryPath ? 'products?categoryUrl=' + categoryPath : 'products',
        {
          responseType: 'json',
          transformResponse: (res) => {
            const responseJson = JSON.parse(res);

            if (!categoryPath) {
              return responseJson.data;
            }
            return responseJson.categoryData.data;
          },
        }
      );

      return await productsByCat.data;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
  return productsByCat;
};

export default useGetProducts;
