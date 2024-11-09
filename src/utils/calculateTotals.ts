interface Price {
  name: string;
  price: number;
}

interface Product {
  quantity: number;
  prices: Price[];
}

export const calculateProductTotal = (product: Product) => {
  const { quantity, prices } = product;
  return (quantity * prices[0].price).toFixed(2).toString();
};

export const calculateBillTotal = (products: Product[]) => {
  if (!products.length) return "0.00";
  return products
    .reduce((a, b) => a + b.quantity * b.prices[0].price, 0)
    .toFixed(2)
    .toString();
};
