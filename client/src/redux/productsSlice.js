import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loadingProducts: false,
        searchProductByText: "",
        selectedProduct: null,
        singleProduct:null
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setSearchProductByText: (state, action) => {
            state.searchProductByText = action.payload
        },

        setLoadingProduct: (state, action) => {
            state.loadingProducts = action.payload
        },
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        updateProduct: (state, action) => {
            const index = state.products.findIndex(c => c._id === action.payload._id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(c => c._id !== action.payload._id);
        },
        getProductById: (state, action) => {
            state.selectedProduct = state.products.find(c => c._id === action.payload._id) || null;
        }
    }
})

export const { setProducts, setSearchProductByText, setLoadingProduct, addProduct, updateProduct, deleteProduct, getProductById } = productSlice.actions;
export default productSlice.reducer;