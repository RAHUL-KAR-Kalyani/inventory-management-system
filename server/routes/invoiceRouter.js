const express = require('express');
const isAuth = require('../middleware/isAuth');
const { createInvoice, getInvoices, getInvoiceById, updateInvoice, deleteInvoice } = require('../controllers/invoiceControllers');

const invouceRouter = express.Router();

invouceRouter.post('/create-invoice', isAuth, createInvoice);
invouceRouter.get('/get-invoice', isAuth, getInvoices);
invouceRouter.get('/get-invoicebyid/:id', isAuth, getInvoiceById);
invouceRouter.patch('/update-invoice/:id', isAuth, updateInvoice);
invouceRouter.delete('/delete-invoice/:id', isAuth, deleteInvoice);

module.exports = invouceRouter;