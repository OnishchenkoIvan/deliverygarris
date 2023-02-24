import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PizzaBlockType } from "../../components/PizzaBlock/PizzaBlock";
import axios from "axios";

export type paramsPizzaType = {
  sortDirection: boolean;
  searchValue: string;
  currentPage: number;
  categoryId: number;
  sortType: "rating" | "price" | "title";
};
export const fetchPizzas = createAsyncThunk<PizzaBlockType[], paramsPizzaType>(
  "pizza/fetchPizzaStatus",
  async (params) => {
    const { sortDirection, searchValue, currentPage, categoryId, sortType } =
      params;
    const { data } = await axios.get<PizzaBlockType[]>(
      `https://63ef188e271439b7fe6816d0.mockapi.io/items?page=${
        searchValue ? 1 : currentPage
      }&limit=4${
        categoryId > 0 ? `&category=${categoryId}` : ""
      }&sortBy=${sortType}&order=${sortDirection ? "asc" : "desc"}${
        searchValue ? `&search=${searchValue}` : ""
      }`
    );
    return data;
  }
);

const initialState: InitialStateCartType = {
  items: [],
  status: "loading",
};
export type InitialStateCartType = {
  items: PizzaBlockType[];
  status: "loading" | "success" | "error";
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaBlockType[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.items = [];
      state.status = "loading";
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = [];
      state.status = "error";
    });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
