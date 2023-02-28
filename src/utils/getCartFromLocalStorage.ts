import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLocalStorage = () => {
  const localStorageItems = localStorage.getItem("cart");
  const items = localStorageItems ? JSON.parse(localStorageItems) : [];
  const totalPrice = calcTotalPrice(items);
  return {
    items,
    totalPrice,
  };
};
