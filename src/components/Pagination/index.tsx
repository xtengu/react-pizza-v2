import React from 'react'
import ReactPaginate from 'react-paginate'

import styles from './pagination.module.scss'

type PaginationProps = {
    currentPage: number
    onChangePage: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    onChangePage,
}) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel='...'
            nextLabel='ᐅ'
            onPageChange={(e) => onChangePage(e.selected + 1)}
            pageRangeDisplayed={8}
            pageCount={3}
            previousLabel='ᐊ'
            forcePage={currentPage - 1}
            // renderOnZeroPageCount={null}
        />
    )
}

export default Pagination
