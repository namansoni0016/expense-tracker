import express from "express";
import transactionController from "../controllers/transactionController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const transactionRouter = express.Router();

transactionRouter.post('/api/v1/transactions/add', isAuthenticated, transactionController.create);
transactionRouter.get('/api/v1/transactions/lists', isAuthenticated, transactionController.getFilteredTransactions);

export default transactionRouter;