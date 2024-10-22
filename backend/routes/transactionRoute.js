import express from "express";
import transactionController from "../controllers/transactionController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const transactionRouter = express.Router();

transactionRouter.post('/transactions/add', isAuthenticated, transactionController.create);
transactionRouter.get('/transactions/lists', isAuthenticated, transactionController.getFilteredTransactions);
transactionRouter.get('/transactions/update/:id', isAuthenticated, transactionController.getUpdate);
transactionRouter.put('/transactions/update/:id', isAuthenticated, transactionController.update);
transactionRouter.delete('/transactions/delete/:id', isAuthenticated, transactionController.delete);

export default transactionRouter;