import React from "react";

import Header from "./components/Header";
import Home from "./pages/Home";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

import pizzas from "./assets/pizzas.json";

import "./scss/app.scss";

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  console.log(searchValue, "INPUT CHANGE");

  return (
    <div className='wrapper'>
      <Header
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {/* {isLoading && " Loading..."} */}

      <div className='content'>
        <Routes>
          <Route
            path='/'
            element={<Home searchValue={searchValue} />}
          />

          <Route
            path='/cart'
            element={<Cart />}
          />

          <Route
            path='*'
            element={<NotFound />}
          />
        </Routes>
      </div>
    </div>
  );
}
export default App;
