import { configureStore } from "@reduxjs/toolkit";
import  authSlice  from "./features/login/loginAuth";
import  productsSlice  from "./features/products/getAllProducts";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        productsState: productsSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;