import express from "express";
import usersController from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const userRouter = express.Router();

userRouter.post('/users/register', usersController.register);
userRouter.post('/users/login', usersController.login);
userRouter.get('/users/profile', isAuthenticated, usersController.profile);
userRouter.put('/users/change-password', isAuthenticated, usersController.changeUserPassword);
userRouter.put('/users/update-profile', isAuthenticated, usersController.updateUserProfile);

export default userRouter;