import express from "express";
import usersController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/api/v1/users/register', usersController.register);

export default userRouter;