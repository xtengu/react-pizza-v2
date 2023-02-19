import React from 'react'

import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'
import FullPizza from './pages/FullPizza'

// import pizzas from "./assets/pizzas.json";

import './scss/app.scss'
import MainLayout from './layouts/MainLayout'

function App() {
    return (
        // {/* {isLoading && " Loading..."} */}

   
            <Routes>

                <Route path='/' element ={  <MainLayout/>} >
                 <Route
                    path=''
                    element={<Home />}
                />
                    <Route
                        path='cart'
                        element={<Cart />}
                    />

                    <Route
                        path='pizzas/:id'
                        element={<FullPizza />}
                    />

                    <Route
                        path='*'
                        element={<NotFound />}
                    />
                </Route>
            </Routes>
       
    )
}
export default App
