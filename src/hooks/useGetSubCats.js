import useCostoAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useGetSubCats = (categorypath) => {
  const subcategoriesAxios = useCostoAxios();

  const subCategoriesQuery = useQuery({
    queryKey: ['subcategories', categorypath],
    queryFn: async () => {
      const subcategories = await subcategoriesAxios(
        `categories/${categorypath}`,
        {
          responseType: 'json',
          transformResponse: (res) => {
            const responseJson = JSON.parse(res);

            return responseJson.data;
          },
        }
      );

      return subcategories;
    },
  });

  return subCategoriesQuery;
};

export default useGetSubCats;
