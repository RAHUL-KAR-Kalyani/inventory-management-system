import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice = createSlice({
    name: 'invoices',
    initialState: {
        invoices: [],
        searchInvoiceByText: "",
        loadingInvoice: false,
        selectedInvoice: null,
        error: null
    },
    reducers: {
        setInvoices: (state, action) => {
            state.invoices = action.payload
        },
        setSearchInvoiceByText: (state, action) => {
            state.searchInvoiceByText = action.payload
        },
        setLoadingInvoice: (state, action) => {
            state.loadingInvoice = action.payload
        },
        addInvoice: (state, action) => {
            state.invoices.push(action.payload);
        },
        updateInvoiceByID: (state, action) => {
            const index = state.invoices.findIndex(i => i._id === action.payload._id);
            if (index !== -1) {
                state.invoices[index] = action.payload;
            }
        },
        deleteInvoice: (state, action) => {
            state.invoices = state.invoices.filter(i => i._id !== action.payload._id);
        }
    }
})

export const { setInvoices, setSearchInvoiceByText, setLoadingInvoice, addInvoice, updateInvoiceByID, deleteInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;