import React from "react";
import style from "./Search.module.scss";
import search from "../../assets/img/search.png";
import close from "../../assets/img/closeIcon.png";
import { SearchType } from "../Header/Header";

export const Search: React.FC<SearchType> = ({
  searchValue,
  setSearchValue,
}) => {
  return (
    <div className={style.root}>
      <img src={search} alt={"search"} className={style.icon} />
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={style.input}
        placeholder={"Поиск пиццы..."}
      />
      {searchValue && (
        <img
          onClick={() => setSearchValue("")}
          src={close}
          alt={"clear search"}
          className={style.clearIcon}
        />
      )}
    </div>
  );
};
