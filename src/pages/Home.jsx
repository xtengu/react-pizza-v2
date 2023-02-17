import React from 'react'
// import qs from 'qs'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate , } from 'react-router-dom'

import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'
import Sort from '../components/Sort'
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlices'
import { fetchPizzas  } from '../redux/slices/pizzaSlice'





export const Home = () => {
    const navigate = useNavigate
    const dispatch = useDispatch()
    const isMounted = React.useRef(false)
  

    const {items,status} = useSelector((state)=>state.pizza)
    const { categoryId, sort, currentPage } = useSelector(
        (state) => state.filter
    )
 


    // https://63bd637ad660062388a3f5d4.mockapi.io/items

    const { searchValue } = React.useContext(SearchContext)

 

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

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
                fetchPizzas({
                  sortBy,
                  order,
                  category,
                  search,
                  currentPage,
                }),
              );


        window.scrollTo(0, 0)
    }

    React.useEffect(() => {
        getPizzas()
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
        
            {status === 'error' ? (
                <div className = 'content__error-info'>
                   
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
