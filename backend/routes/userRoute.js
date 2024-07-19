import express from "express";
import usersController from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const userRouter = express.Router();

userRouter.post('/api/v1/users/register', usersController.register);
userRouter.post('/api/v1/users/login', usersController.login);
userRouter.get('/api/v1/users/profile', isAuthenticated, usersController.profile);

export default userRouter;