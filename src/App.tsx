import React from "react";
import "./scss/app.scss";
import { Header } from "./components/Header/Header";
import { Categories } from "./components/Categories/Categories";
import { Sort } from "./components/Sort/Sort";
import { PizzaBlock } from "./components/PizzaBlock/PizzaBlock";

export function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <div className="sort">
              <Sort />
              <div className="sort__popup">
                <ul>
                  <li className="active">популярности</li>
                  <li>цене</li>
                  <li>алфавиту</li>
                </ul>
              </div>
            </div>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            <PizzaBlock title="Чизбургер-пицца" price={390} />
            <PizzaBlock title="Четыре сыра" price={480} />
          </div>
        </div>
      </div>
    </div>
  );
}
