export const formatPrice = (price: number) => {
  return `R$ ${price.toLocaleString("pt-br", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })}`;
};
