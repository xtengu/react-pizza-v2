import React from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlices'
import Sort from '../components/Sort'
import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'

export const Home = () => {
    const dispatch = useDispatch()
    const { categoryId, sort, currentPage } = useSelector(
        (state) => state.filter
    )

    // https://63bd637ad660062388a3f5d4.mockapi.io/items

    const { searchValue } = React.useContext(SearchContext)
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    React.useEffect(() => {
        setIsLoading(true)

        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        //   fetch(
        //     `https://63bd637ad660062388a3f5d4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        //   )
        //     .then((res) => {
        //       return res.json();
        //     })
        //     .then((arr) => {
        //       setTimeout(() => {
        //         setItems(arr);
        //         setIsLoading(false);
        //       }, 1000);
        //     });

        axios
            .get(
                `https://63bd637ad660062388a3f5d4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
            )
            .then((res) => {
                setItems(res.data)
                setIsLoading(false)
            })

        window.scrollTo(0, 0)
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const pizzas = items
        // .filter((obj) => {
        //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        //     return true;
        //   }
        //   return false;
        // })
        .map((obj) => (
            <PizzaBlock
                key={obj.id}
                {...obj}
            />
        ))

    const skeletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index} />
    ))

    return (
        <div className='container'>
            <div className='content__top'>
                {/* {Categories() }  */}

                <Categories
                    value={categoryId}
                    onChangeCategory={onChangeCategory}
                />
                <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>{' '}
            <div className='content__items'>
                {isLoading ? skeletons : pizzas}
            </div>{' '}
            <Pagination
                currentPage={currentPage}
                onChangePage={onChangePage}
            />
        </div>
    )
}

export default Home
