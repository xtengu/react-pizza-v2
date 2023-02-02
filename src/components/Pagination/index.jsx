import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./pagination.module.scss";

const Pagination = ({onChangePage}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='ᐅ'
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      previousLabel='ᐊ'
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
