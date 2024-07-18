import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// User Registration
const usersController = {
    //Register
    register: asyncHandler(async (req, res) => {
        const {username, email, password} = req.body;
        if(!username || !email || !password) {
            throw new Error('All fields are required!!');
        }
        const userExists = await User.findOne({ email });
        if(userExists) {
            throw new Error('User already exists!');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userCreated = await User.create({
            username,
            email,
            password: hashedPassword
        })
        res.json({
            username: userCreated.username,
            email: userCreated.email,
            id: userCreated._id
        })
    }),
    //Login
    //Profile
};

export default usersController;