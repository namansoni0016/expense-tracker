import Category from "../models/Category.js";
import asyncHandler from "express-async-handler";
import Transaction from "../models/Transaction.js";

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
        res.status(201).json(category);
    }),
    //lists
    lists: asyncHandler(async (req, res) => {
        const categories = await Category.find({ user: req.user});
        res.status(200).json(categories)
    }),
    //Getting Update
    getUpdate: asyncHandler(async (req, res) => {
        const categoryId = req.params.categoryId;
        const categoryFound = await Category.findById(categoryId);
        res.json({
            status: "Category Fetched Successfully!",
            categoryFound
        })
    }),
    //update
    update: asyncHandler(async (req, res) => {
        const { categoryId } = req.params;
        const { type, name } = req.body;
        const normalizedName = name.toLowerCase();
        const category = await Category.findById(categoryId);
        if(!category && category.user.toString() !== req.user.toString()){
            throw new Error("Category not found or user not authorized!");
        } 
        const oldName = category.name;
        category.name = normalizedName || category.name;
        category.type = type || category.type;
        const updatedCategory = await category.save();
        //Update affected transactions
        if(oldName !== updatedCategory.name) {
            await Transaction.updateMany({
                user: req.user,
                category: oldName,
            }, {
                $set: {cateogry: updatedCategory.name}
            })
        }
        res.json({
            status: "Post Updated",
            updatedCategory
        });
    }),
    //delete
    delete: asyncHandler(async (req, res) => {
        const category = await Category.findById(req.params.id);
        if(category && category.user.toString() === req.user.toString()){
            const defaultCategory = 'Uncategorized';
            await Transaction.updateMany({ user: req.user, category: category.name }, 
                {$set: {category: defaultCategory}});
            await Category.findByIdAndDelete(req.params.id);
            res.json({ message: "Category removed and transactions updated!"});
        } else {
            res.json({ message: "Category not found or user not found!"});
        }
    })
}

export default categoryController;