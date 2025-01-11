import { configureStore } from "@reduxjs/toolkit";
import ecommerceReducer from '../features/ecommerceSlice'

export default configureStore({
    reducer: {
        ecommerce: ecommerceReducer
    }
})