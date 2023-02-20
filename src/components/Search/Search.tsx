import React from "react";
import style from "./Search.module.scss";
import search from "../../assets/img/search.png";
import close from "../../assets/img/closeIcon.png";
import { SearchContext } from "../../App";

export const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);
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
