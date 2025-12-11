import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";
import authReducer from './authSlice'
import customersReducer from './customersSlice'
import productsReducer from './productsSlice'
import invoicesReducer from './invoicesSlice'

export const store=configureStore({
    reducer:{
        dashboard: dashboardReducer,
        auth:authReducer,
        customers: customersReducer,
        products: productsReducer,
        invoices: invoicesReducer
    }
})