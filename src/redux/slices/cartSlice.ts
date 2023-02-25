import { createSlice } from "@reduxjs/toolkit";
import { PizzaBlockType } from "../../components/PizzaBlock/PizzaBlock";
import { RootState } from "../store";

const initialState: InitialStateCartType = {
  totalPrice: 0,
  items: [],
};
export type InitialStateCartType = {
  totalPrice: number;
  items: PizzaBlockType[];
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count += 1;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count -= 1;
        state.totalPrice -= findItem.price;
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => {
        if (obj.id === action.payload)
          state.totalPrice -= obj.count * obj.price;
        return obj.id !== action.payload;
      });
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState): InitialStateCartType =>
  state.cart;
export const selectCartItemById = (id: number) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
