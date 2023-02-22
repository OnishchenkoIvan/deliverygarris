import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialStateType = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};
export type InitialStateType = {
  categoryId: number;
  currentPage: number;
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
    setPageCount(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = action.payload.currentPage;
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryId, setSort, setPageCount } = filterSlice.actions;
export default filterSlice.reducer;
