import useCostoAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useGetProducts = (categoryPath) => {
  const CostoAxios = useCostoAxios();

  const productsByCat = useQuery({
    queryKey: ['productsByCat', categoryPath],
    queryFn: async () => {
      const productsByCat = await CostoAxios(
        'products?categoryUrl=' + categoryPath,
        {
          responseType: 'json',
          transformResponse: (res) => {
            const responseJson = JSON.parse(res);

            return responseJson.categoryData.data;
          },
        }
      );

      return await productsByCat.data;
    },
  });
  return productsByCat;
};

export default useGetProducts;
