import express from "express";
import usersController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/api/v1/users/register', usersController.register);
userRouter.post('/api/v1/users/login', usersController.login);

export default userRouter;