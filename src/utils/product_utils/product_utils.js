export const formatPrices = (num) => {
  let formatedPrice = Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARG',
  });
  return formatedPrice.format(num);
};
