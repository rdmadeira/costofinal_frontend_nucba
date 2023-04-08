export const getMenuNamesData = async () => {
  const menuNames = fetch('./data/menuProducts.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => Object.keys(data).map((key) => ({ name: key })))
    .catch((err) => console.log(err));
  return menuNames;
};

export const getProducts = async () => {
  const products = fetch('./data/products.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => data)
    .catch((err) => console.log(err));
  return products;
};
