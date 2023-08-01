/* import { getProductsFromDB } from '../../firebase/firestore'; */

export const getMenuNamesAndAddPath = (menuItems) => {
  const changedMenuItems = menuItems.map((key) => ({
    name: key.name,
    path: key.name.replace(/\s+/g, '-').toLowerCase(),
  }));

  return changedMenuItems;
};

export const getProducts = async () => {
  const products = fetch(process.env.PUBLIC_URL + '/data/products.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => data)
    .catch((err) => console.log(err));
  return products;
};

export const sendItemsToCarrousel = async (
  itemsToCarrousel,
  allProductsArray
) => {
  let respuesta = [];

  itemsToCarrousel.forEach((item) => {
    allProductsArray.forEach((prod) => {
      if (prod.CODIGO === item.codigo) {
        respuesta.push({ ...prod, image: item.image });
      }
    });
  });

  return respuesta;
};
