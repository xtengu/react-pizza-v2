import React from 'react'
import qs from 'qs'
 
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
 
import Sort from '../components/Sort'
import {
    selectFilter,
    setCategoryId,
    setCurrentPage,
    setFilters,
} from '../redux/slices/filterSlices'
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice'


export const Home:React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const { items, status } = useSelector(selectPizzaData)
    const { categoryId, sort, currentPage, searchValue } =
        useSelector(selectFilter)

    // https://63bd637ad660062388a3f5d4.mockapi.io/items

    const onChangeCategory = (idx:number) => {
        dispatch(setCategoryId(idx))
    }

    const onChangePage = (page:number) => {
        dispatch(setCurrentPage(page))
    }

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            // const sort = sortList.find(
            //     (obj) => obj.sortProperty === params.sortProperty
            // )

            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            )
        }
        isSearch.current = true
    }, [])

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const getPizzas = async () => {
        // setIsLoading(true)

        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        // if(!window.location.search){
        //     fetchPizzas();
        // }

        dispatch(
            //@ts-ignore
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage,
            })
        )
    }

    React.useEffect(() => {
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false
    }, [categoryId, sort.sortProperty, searchValue, currentPage])




    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage])

    const pizzas = items
        // .filter((obj) => {
        //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        //     return true;
        //   }
        //   return false;
        // })
        .map((obj:any) => (
            <Link
                key={obj.id}
                to={`/pizzas/${obj.id}`}
            >
                <PizzaBlock {...obj} />
            </Link>
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
            {status === 'error' ? (
                <div className='content__error-info'>
                    <h2> Error</h2>
                    <p> unable fetch database pizzas . try again later </p>
                </div>
            ) : (
                <div className='content__items'>
                    {status === 'loading' ? skeletons : pizzas}
                </div>
            )}
            <Pagination
                currentPage={currentPage}
                onChangePage={onChangePage}
            />
        </div>
    )
}

export default Home
