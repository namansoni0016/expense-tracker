import express from "express";
import categoryController from "../controllers/categoryController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const categoryRouter = express.Router();

categoryRouter.post('/api/v1/categories/create', isAuthenticated, categoryController.create);
categoryRouter.get('/api/v1/categories/lists', isAuthenticated, categoryController.lists);
categoryRouter.get('/api/v1/categories/update/:categoryId', isAuthenticated, categoryController.getUpdate);
categoryRouter.put('/api/v1/categories/update/:categoryId', isAuthenticated, categoryController.update);
categoryRouter.delete('/api/v1/categories/delete/:id', isAuthenticated, categoryController.delete)

export default categoryRouter;