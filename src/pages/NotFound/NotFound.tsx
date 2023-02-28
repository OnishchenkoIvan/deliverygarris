import React from "react";
import style from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={style.root}>
      <span>😴</span>
      <h1>Ничего не найдено</h1>
      <p>К сожалению такой страницы нет</p>
    </div>
  );
};

export default NotFound;
