import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    login: asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) {
            throw new Error('Invalid login credentials!');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            throw new Error('Invalid login credentials!');
        }
        const token = jwt.sign({id: user._id}, 'namansoni', {
            expiresIn: '30d',
        });
        res.json({
            message: "Login Successful",
            token,
            id: user._id,
            email: user.email,
            username: user.username,
        })
    }),
    //Profile
    profile: asyncHandler(async (req, res) => {
        const user = await User.findById(req.user);
        if(!user) {
            throw new Error('User not found!');
        }
        res.json({ username: user.username, email: user.email });
    }),
    // Change Password
    changeUserPassword: asyncHandler(async (req, res) => {
        const { newPassword } = req.body;
        const user = await User.findById(req.user);
        if(!user) {
            throw new Error("User not found!");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.json({ message: "Password changed successfully!!"});
    }),
    // Update user profile
    updateUserProfile: asyncHandler(async (req, res) => {
        const { email, username } = req.body;
        const updateUser = await User.findByIdAndUpdate(req.user, {
            username,
            email
        }, {
            new: true
        });
        res.json({ message: "User profile updated successfully!", updateUser});
    })
};

export default usersController;