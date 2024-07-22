import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import errorHandler from "./middlewares/errorHandler.js";
import categoryRouter from "./routes/categoryRoute.js";
import transactionRouter from "./routes/transactionRoute.js";
dotenv.config();

const app = express();

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database Connected!"))
.catch((e) => console.log(e));

//Middlewares
app.use(express.json());

//Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter); 

//Error
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});