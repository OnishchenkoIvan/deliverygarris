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
  React.useEffect(() => {
    fetch("https://63ef188e271439b7fe6816d0.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <div className="content__top">
        <Categories />
        <div className="sort">
          <Sort />
        </div>
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
