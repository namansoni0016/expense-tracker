import express from "express";
import categoryController from "../controllers/categoryController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const categoryRouter = express.Router();

categoryRouter.post('/api/v1/categories/create', isAuthenticated, categoryController.create);
categoryRouter.get('/api/v1/categories/lists', isAuthenticated, categoryController.lists);


export default categoryRouter;