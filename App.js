/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import SingleProduct from "./SingleProduct";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "./features/ecommerceSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => {
    return state.ecommerce;
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (loading) {
    return "Loading the data....";
  }

  if(error.length > 0){
    return error
  }

  return (
    <BrowserRouter>
      <header>
        <h1>Ecommerce Redux</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </header>
      <Routes>
        <Route path="/" element={<Home products={products} />}></Route>
        <Route path="/product/:id" element={<SingleProduct />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
