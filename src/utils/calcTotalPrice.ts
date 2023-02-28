import { CartItemType } from "../pages/Cart/CartItem";

export const calcTotalPrice = (items: CartItemType[]) => {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};
