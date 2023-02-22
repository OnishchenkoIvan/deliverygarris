import React from "react";
import ReactPaginate from "react-paginate";
import style from "./Pagination.module.scss";

export const Pagination: React.FC<{
  currantPage: number;
  onPageChange: (num: number) => void;
}> = ({ currantPage, onPageChange }) => {
  return (
    <ReactPaginate
      className={style.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onPageChange(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      forcePage={currantPage - 1}
      // renderOnZeroPageCount={null}
    />
  );
};
