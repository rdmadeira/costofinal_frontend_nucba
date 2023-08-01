import useCostoAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useGetCategories = () => {
  const categoriesAxios = useCostoAxios();

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const categories = await categoriesAxios('categories', {
        responseType: 'json',
        transformResponse: (res) => {
          const responseJson = JSON.parse(res);

          const changedMenuItems = responseJson.data.map((key) => ({
            name: key.name,
            path: key.url,
          }));

          return changedMenuItems;
        },
      });

      return categories;
    },

    staleTime: 1000 * 60,
  });

  return categoriesQuery;
};

export default useGetCategories;
