export const getMenuNamesData = async () => {
  const menuNames = fetch('./data/menuProducts.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => Object.keys(data).map((key) => ({ name: key })))
    .catch((err) => console.log(err));
  return menuNames;
};
