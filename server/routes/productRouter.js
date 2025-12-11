const express = require('express');
const { addProduct, getProducts, getProductsById, updateProduct, deleteProduct } = require('../controllers/productControllers');
const isAuth = require('../middleware/isAuth');
const roleMiddleware = require('../middleware/roleMiddleware');

const productRouter = express.Router();

// role middleware implementation still pending (not working)

productRouter.post('/add-product', isAuth, roleMiddleware("admin"), addProduct);
// productRouter.post('/add-product', isAuth, addProduct);
productRouter.get('/get-product', isAuth, getProducts);
productRouter.get('/get-productbyid/:id', isAuth, getProductsById);
productRouter.patch('/update-product/:id', isAuth, updateProduct);
productRouter.delete('/delete-product/:id', isAuth, roleMiddleware("admin"), deleteProduct);

module.exports = productRouter;