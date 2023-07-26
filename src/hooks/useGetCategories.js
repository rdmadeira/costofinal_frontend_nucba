import CostoAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useGetCategories = () => {
  const categoriesAxios = CostoAxios();

  const categoriesQuery = useQuery(
    {
      queryKey: ['categories'],
      queryFn: async () => {
        const categories = await categoriesAxios('categories', {
          responseType: 'json',
          transformResponse: (res) => {
            const responseJson = JSON.parse(res);

            const changedMenuItems = responseJson.data.map((key) => ({
              name: key.name,
              path: key.name.replace(/\s+/g, '-').toLowerCase(),
            }));

            return changedMenuItems;
          },
        });

        return categories;
      },
    },
    { refetchOnMount: false }
  );

  return categoriesQuery;
};

export default useGetCategories;
