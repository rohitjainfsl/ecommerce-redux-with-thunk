/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleAddToCart } from "./features/ecommerceSlice";

function Home({ products }) {
  const dispatch = useDispatch();

  function addProductToCart(product) {
    dispatch(handleAddToCart(product));
  }

  return (
    <div className="products">
      {products.map((product) => {
        return (
          <div className="product" key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.title} />
            </Link>
            <h3>{product.title}</h3>
            <button onClick={() => addProductToCart(product)}>
              Add To Cart
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
