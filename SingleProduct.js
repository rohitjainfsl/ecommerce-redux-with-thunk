import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddToCart,
  fetchProductById,
  clearProduct,
} from "./features/ecommerceSlice";

function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleProduct = useSelector((state) => state.ecommerce.singleProduct);

  useEffect(() => {
    if (!singleProduct || singleProduct.id !== Number(id)) {
      dispatch(clearProduct()); // clear previous product data
      dispatch(fetchProductById(id));
      console.log(singleProduct);
    }
  }, [id, dispatch, singleProduct]);

  function addProductToCart(product) {
    dispatch(handleAddToCart(product));
  }

  return (
    singleProduct && (
      <div className="single-product">
        <div className="left">
          <img src={singleProduct.image} alt={singleProduct.title}></img>
        </div>
        <div className="right">
          <h2>{singleProduct.title}</h2>
          <p>{singleProduct.description}</p>
          <button onClick={() => addProductToCart(singleProduct)}>
            Add To Cart
          </button>
        </div>
      </div>
    )
  );
}

export default SingleProduct;
