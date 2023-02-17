import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlices'
import cart from './slices/cartSlice'
import pizza from './slices/pizzaSlice'

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza,
    },
})
