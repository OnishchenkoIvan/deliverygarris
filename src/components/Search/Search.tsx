import React from "react";
import style from "./Search.module.scss";
import search from "../../assets/img/search.png";
import close from "../../assets/img/closeIcon.png";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

export const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 500),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={style.root}>
      <img src={search} alt={"search"} className={style.icon} />
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChangeInput(e)}
        className={style.input}
        placeholder={"Поиск пиццы..."}
      />
      {value && (
        <img
          onClick={onClickClear}
          src={close}
          alt={"clear search"}
          className={style.clearIcon}
        />
      )}
    </div>
  );
};
