import {
  getProductsFromDB,
  getProductsArrayToMenu,
} from '../../firebase/firestore';

export const getMenuNamesData = async () => {
  const menuNames = await getProductsArrayToMenu()
    .then((response) => {
      return response;
    })
    .then((data) =>
      data.map((key) => ({
        name: key,
        path: key.replace(/\s+/g, '-').toLowerCase(),
      }))
    )
    .catch((err) => console.log(err));
  return menuNames;
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

export const sendItemsToCarrousel = async (itemsToCarrousel) => {
  const productosJson = await getProductsFromDB();
  let allProductsArray = Object.keys(productosJson).flatMap((key) =>
    Object.keys(productosJson[key]).flatMap((subKey) =>
      productosJson[key][subKey].flatMap((subSubProd) => ({
        ...subSubProd,
        familia: key,
      }))
    )
  );
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
