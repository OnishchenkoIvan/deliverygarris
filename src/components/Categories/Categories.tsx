import React from "react";
import { useWhyDidYouUpdate } from "ahooks";

type CategoriesType = {
  value: number;
  onChangeCategory: (index: number) => void;
};

export const Categories: React.FC<CategoriesType> = React.memo(
  ({ value, onChangeCategory }) => {
    useWhyDidYouUpdate("Categories", {
      value,
      onChangeCategory,
    });
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
  }
);
