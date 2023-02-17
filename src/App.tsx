import React from "react";
import "./scss/app.scss";
import { Header } from "./components/Header/Header";
import { Categories } from "./components/Categories/Categories";
import { Sort } from "./components/Sort/Sort";
import { PizzaBlock, PizzaBlockType } from "./components/PizzaBlock/PizzaBlock";

export function App() {
  const [items, setItems] = React.useState<PizzaBlockType[]>([]);

  React.useEffect(() => {
    fetch("https://63ef188e271439b7fe6816d0.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <div className="sort">
              <Sort />
            </div>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((item) => {
              return (
                <PizzaBlock
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  types={item.types}
                  sizes={item.sizes}
                  title={item.title}
                  price={item.price}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
