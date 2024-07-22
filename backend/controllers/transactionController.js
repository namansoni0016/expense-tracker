import asyncHandler from "express-async-handler";
import Transaction from "../models/Transaction.js";

const transactionController = {
    //add
    create: asyncHandler(async(req, res) => {
        const { type, category, amount, date, description } = req.body;
        if(!amount || !type || !date ){
            throw new Error('Type, amount & date are required!');
        }
        const transaction = await Transaction.create({
            user: req.user,
            type, 
            category,
            amount,
            description,
        });
        res.status(201).json(transaction);
    }),
    //filter
    getFilteredTransactions: asyncHandler(async(req, res) => {
        const {startDate, endDate, type, category } = req.query;
        let filters = {user: req.user}; 
        if(startDate) {
            filters.date = {...filters.date, $gte: new Date(startDate)};
        }
        if(endDate) {
            filters.date = {...filters.date, $lte: new Date(endDate)};
        }
        if(type) {
            filters.type = type;
        }
        if(category) {
            if(category === 'All'){
                //No filter needed
            } else if(category === "Uncategorized") {
                // filter for uncategorized
                filters.category = 'Uncategorized'
            } else {
                filters.category = category;
            }
        }
        const transactions = await Transaction.find(filters).sort({date: -1})
        res.json(transactions);
    })
}

export default transactionController;