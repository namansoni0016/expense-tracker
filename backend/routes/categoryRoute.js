import express from "express";
import categoryController from "../controllers/categoryController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const categoryRouter = express.Router();

categoryRouter.post('/categories/create', isAuthenticated, categoryController.create);
categoryRouter.get('/categories/lists', isAuthenticated, categoryController.lists);
categoryRouter.get('/categories/update/:categoryId', isAuthenticated, categoryController.getUpdate);
categoryRouter.put('/categories/update/:categoryId', isAuthenticated, categoryController.update);
categoryRouter.delete('/categories/delete/:id', isAuthenticated, categoryController.delete)

export default categoryRouter;