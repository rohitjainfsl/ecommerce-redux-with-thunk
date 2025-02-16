import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "ecommerce/fetchProducts",
  async () => {
    const result = await axios.get("https://fakestoreapi.com/products/");
    return result.data;
  }
);

export const fetchProductById = createAsyncThunk(
  "ecommerce/fetchProductById",
  async (id) => {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  }
);

export const clearProduct = createAction("ecommerce/clearProduct");

export const ecommerceSlice = createSlice({
  name: "ecommerce",
  initialState: {
    products: [],
    loading: false,
    error: "",
    cart: [],
    singleProduct: {},
  },
  reducers: {
    handleAddToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    handleDeleteFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload
      );
    },
    clearProduct: (state) => {
      state.singleProduct = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts cases
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.error = "There was an error.";
      })
      // fetchProductById cases
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
        console.log(state.singleProduct);
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.error = "There was an error.";
      });
  },
});

export const { handleAddToCart, handleDeleteFromCart } = ecommerceSlice.actions;

export default ecommerceSlice.reducer;
