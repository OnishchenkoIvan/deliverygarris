import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialStateType = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};
export type InitialStateType = {
  categoryId: number;
  sort: {
    name: string;
    sortProperty: "rating";
  };
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { setCategoryId, setSort } = filterSlice.actions;
export default filterSlice.reducer;
