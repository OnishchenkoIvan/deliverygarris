import React from "react";
import { Categories } from "../../components/Categories/Categories";
import { list, Sort } from "../../components/Sort/Sort";
import { Sceleton } from "../../components/PizzaBlock/Sceleton";
import {
  PizzaBlock,
  PizzaBlockType,
} from "../../components/PizzaBlock/PizzaBlock";
import { Pagination } from "../../components/Pagination/Pagination";
import { SearchContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setFilters,
  setPageCount,
} from "../../redux/slices/filterSlice";
import { RootState } from "../../redux/store";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryId = useSelector<RootState, number>(
    (state) => state.filter.categoryId
  );
  const currentPage = useSelector<RootState, number>(
    (state) => state.filter.currentPage
  );
  const sortType = useSelector<RootState, "rating" | "price" | "title">(
    (state) => state.filter.sort.sortProperty
  );

  const [items, setItems] = React.useState<PizzaBlockType[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sortDirection, setSortDirection] = React.useState(true);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { searchValue } = React.useContext(SearchContext);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (num: number) => {
    dispatch(setPageCount(num));
  };

  const fetchPizzas = () => {
    setIsLoading(true);
    axios
      .get(
        `https://63ef188e271439b7fe6816d0.mockapi.io/items?page=${
          searchValue ? 1 : currentPage
        }&limit=4${
          categoryId > 0 ? `&category=${categoryId}` : ""
        }&sortBy=${sortType}&order=${sortDirection ? "asc" : "desc"}${
          searchValue ? `&search=${searchValue}` : ""
        }`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scroll(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, sortDirection, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, sortDirection, currentPage]);
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
      <div className="content__items">
        {items.map((item) =>
          isLoading ? (
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
      <Pagination onPageChange={onChangePage} currantPage={currentPage} />
    </>
  );
};
