import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./pagination.module.scss";

const Pagination = ({currentPage, onChangePage}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='ᐅ'
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      previousLabel='ᐊ'
      forcePage={currentPage -1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
