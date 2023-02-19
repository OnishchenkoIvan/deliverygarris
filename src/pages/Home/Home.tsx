import React from "react";
import { Categories } from "../../components/Categories/Categories";
import { Sort } from "../../components/Sort/Sort";
import { Sceleton } from "../../components/PizzaBlock/Sceleton";
import {
  PizzaBlock,
  PizzaBlockType,
} from "../../components/PizzaBlock/PizzaBlock";

export const Home = () => {
  const [items, setItems] = React.useState<PizzaBlockType[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortDirection, setSortDirection] = React.useState(true);

  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63ef188e271439b7fe6816d0.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortType.sortProperty}&order=${sortDirection ? "asc" : "desc"}`
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
  }, [categoryId, sortType, sortDirection]);

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id) => setCategoryId(id)}
        />

        <Sort
          value={sortType}
          onClickSort={(id) => setSortType(id)}
          sortDirectionToggle={() => setSortDirection(!sortDirection)}
          sortDirection={sortDirection}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {items.map((item) =>
          isLoading ? (
            <Sceleton />
          ) : (
            <PizzaBlock
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              types={item.types}
              sizes={item.sizes}
              title={item.title}
              price={item.price}
            />
          )
        )}
      </div>
    </>
  );
};