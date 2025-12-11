const express = require('express');
const { registerController, loginController, profileController, logoutController } = require('../controllers/userControllers');
const isAuth = require('../middleware/isAuth');
// const roleMiddleware = require('../middleware/roleMiddleware');

const authRouter = express.Router();

authRouter.post('/register', registerController);
// authRouter.post('/register', isAuth,roleMiddleware("admin"), registerController);
authRouter.post('/login', loginController);
authRouter.get('/profile', isAuth, profileController);
authRouter.get('/logout', isAuth, logoutController);

module.exports = authRouter;