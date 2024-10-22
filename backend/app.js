import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import errorHandler from "./middlewares/errorHandler.js";
import categoryRouter from "./routes/categoryRoute.js";
import transactionRouter from "./routes/transactionRoute.js";
import cors from "cors";
import path from "path";
dotenv.config();

const app = express();

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database Connected!"))
.catch((e) => console.log(e));

const __dirname = path.resolve();

//Cors config
const corsOptions = {
    origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
//Middlewares
app.use(express.json());

//Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter); 

app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirnamem, 'frontend', 'dist', 'index.html'))
})

//Error
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});