import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
    name: 'customers',
    initialState: {
        customers: [],
        loadingCustomer: false,
        searchCustomerByText: "",
        selectedCustomer: null,
        singleCustomer:null
    },
    reducers: {
        setCustomers: (state, action) => {
            state.customers = action.payload
        },
        setSearchCustomerByText: (state, action) => {
            state.searchCustomerByText = action.payload
        },
        setLoadingCustomer: (state, action) => {
            state.loadingCustomer = action.payload
        },
        addCustomer: (state, action) => {
            state.customers.push(action.payload);
        },
        updateCustomer: (state, action) => {
            const index = state.customers.findIndex(c => c._id === action.payload._id);
            if (index !== -1) {
                state.customers[index] = action.payload;
            }
        },
        deleteCustomer: (state, action) => {
            state.customers = state.customers.filter(c => c._id !== action.payload._id);
        },
        getCustomerById: (state, action) => {
            state.selectedCustomer = state.customers.find(c => c._id === action.payload._id) || null;
        }
    }
})

export const { setLoadingCustomer,setSearchCustomerByText, setCustomers, addCustomer, updateCustomer, deleteCustomer, getCustomerById, } = customerSlice.actions;
export default customerSlice.reducer;