import Category from "../models/Category.js";
import asyncHandler from "express-async-handler";

const categoryController = {
    //add
    create: asyncHandler(async (req, res) => {
        const { name, type } = req.body;
        if(!name || !type) {
            throw new Error('Name and type are required to create a category!');
        }
        const normalizedName = name.toLowerCase();
        const validTypes = ['income', 'expense'];
        if(!validTypes.includes(type.toLowerCase())){
            throw new Error("Invalid category type: " + type);
        }
        //check if category already existso on the user
        const categoryExists = await Category.findOne({name: normalizedName, user: req.user});
        if(categoryExists){
            throw new Error(`Category ${categoryExists.name} already exists in the database!`);
        }
        const category = await Category.create({
            name: normalizedName,
            user: req.user,
            type, 
        });
        res.statusCode(201).json(category);
    }),
    //lists
    lists: asyncHandler(async (req, res) => {
        const categories = await Category.find({ user: req.user});
        res.status(200).json(categories)
    }),
    //update
    update: asyncHandler(),
    //delete
    delete: asyncHandler()
}

export default categoryController;