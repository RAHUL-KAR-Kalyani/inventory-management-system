const express = require('express');
const isAuth = require('../middleware/isAuth');
const roleMiddleware = require('../middleware/roleMiddleware');
const { addCustomer, getCustomer, getCutsomerById, updateCustomer, deleteCustomer } = require('../controllers/customerControllers');

const customerRouter = express.Router();

// customerRouter.post('/add-customer',isAuth,roleMiddleware(["admin", "staff"]),addCustomer);
// customerRouter.get('/get-customer',isAuth,roleMiddleware(["admin", "staff"]),getCustomer);
// customerRouter.get('/get-customerbyid/:id',isAuth,roleMiddleware(["admin", "staff"]),getCutsomerById);
// customerRouter.patch('/update-customer/:id',isAuth,roleMiddleware(["admin", "staff"]),updateCustomer);
// customerRouter.delete('/delete-customer/:id',isAuth,roleMiddleware(["admin", "staff"]),deleteCustomer);


customerRouter.post('/add-customer', isAuth, addCustomer);
customerRouter.get('/get-customer', isAuth, getCustomer);
customerRouter.get('/get-customerbyid/:id', isAuth, getCutsomerById);
customerRouter.patch('/update-customer/:id', isAuth, updateCustomer);
customerRouter.delete('/delete-customer/:id', isAuth, deleteCustomer);


module.exports = customerRouter;
