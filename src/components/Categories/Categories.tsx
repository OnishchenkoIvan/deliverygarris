import React from "react";

type CategoriesType = {
  value: number;
  onChangeCategory: (index: number) => void;
};

export const Categories: React.FC<CategoriesType> = ({
  value,
  onChangeCategory,
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
              onClick={() => onChangeCategory(index)}
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
