import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SortPropertyType } from "../../components/Sort/Sort";

const initialState: InitialSortStateType = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};
export type InitialSortStateType = {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortPropertyType;
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
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

export const selectFilter = (state: RootState): InitialSortStateType =>
  state.filter;
export const selectSort = (state: RootState): SortPropertyType => {
  return state.filter.sort;
};
export const {
  setCategoryId,
  setSort,
  setPageCount,
  setFilters,
  setSearchValue,
} = filterSlice.actions;
export default filterSlice.reducer;
