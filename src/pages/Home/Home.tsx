import React from "react";
import { Categories } from "../../components/Categories/Categories";
import { list, Sort } from "../../components/Sort/Sort";
import { Sceleton } from "../../components/PizzaBlock/Sceleton";
import {
  PizzaBlock,
  PizzaBlockType,
} from "../../components/PizzaBlock/PizzaBlock";
import { Pagination } from "../../components/Pagination/Pagination";
import { useSelector } from "react-redux";
import {
  InitialSortStateType,
  selectFilter,
  setCategoryId,
  setFilters,
  setPageCount,
} from "../../redux/slices/filterSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { fetchPizzas, selectPizzaData } from "../../redux/slices/pizzaSlice";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { categoryId, currentPage, sort, searchValue } = useSelector<
    RootState,
    InitialSortStateType
  >(selectFilter);

  const { status, items } = useSelector<
    RootState,
    { items: PizzaBlockType[]; status: "loading" | "success" | "error" }
  >(selectPizzaData);

  // const [isLoading, setIsLoading] = React.useState(true);
  const [sortDirection, setSortDirection] = React.useState(true);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (num: number) => {
    dispatch(setPageCount(num));
  };

  const params = {
    sortDirection,
    searchValue,
    currentPage,
    categoryId,
    sortType: sort.sortProperty,
  };
  const getPizzas = async () => {
    // setIsLoading(true);
    console.log(params);
    dispatch(fetchPizzas(params));
    window.scroll(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      sort &&
        dispatch(setFilters({ currentPage, categoryId, searchValue, sort }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scroll(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, sortDirection, searchValue, currentPage]);

  React.useEffect(() => {
    getPizzas();
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, sortDirection, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />

        <Sort
          sortDirectionToggle={() => setSortDirection(!sortDirection)}
          sortDirection={sortDirection}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>
            Пиццы нет <span>😢</span>
            <p>
              К сожалению произошла ошибка, попробуйте перезагрузить страницу
              или зайти позже
            </p>
          </h2>
        </div>
      ) : (
        <div className="content__items">
          {items.map((item) =>
            status === "loading" ? (
              <Sceleton key={item.id} />
            ) : (
              <PizzaBlock
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                types={item.types}
                sizes={item.sizes}
                title={item.title}
                price={item.price}
                count={item.count}
              />
            )
          )}
        </div>
      )}

      <Pagination onPageChange={onChangePage} currantPage={currentPage} />
    </>
  );
};
