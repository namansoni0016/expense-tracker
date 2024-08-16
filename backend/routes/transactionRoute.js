import express from "express";
import transactionController from "../controllers/transactionController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const transactionRouter = express.Router();

transactionRouter.post('/api/v1/transactions/add', isAuthenticated, transactionController.create);
transactionRouter.get('/api/v1/transactions/lists', isAuthenticated, transactionController.getFilteredTransactions);
transactionRouter.get('/api/v1/transactions/update/:id', isAuthenticated, transactionController.getUpdate);
transactionRouter.put('/api/v1/transactions/update/:id', isAuthenticated, transactionController.update);
transactionRouter.delete('/api/v1/transactions/delete/:id', isAuthenticated, transactionController.delete);

export default transactionRouter;