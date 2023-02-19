import React from "react";

type CategoriesType = {
  value: number;
  onClickCategory: (index: number) => void;
};

export const Categories: React.FC<CategoriesType> = ({
  value,
  onClickCategory,
}) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((cat, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={value === index ? "active" : ""}
            >
              {cat}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
