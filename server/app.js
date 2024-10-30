import dotenv from 'dotenv';
import express from 'express'
import snippetRoutes from './routes/snippets-routes.js';
import userRoute from './routes/user-routes.js';
import mongoose from 'mongoose';

dotenv.config();
const url = process.env.MONGO_URI;

const app = express();
app.use(express.json())
app.use("/snippets",snippetRoutes)
app.use("/user",userRoute);
const port = 8000;
app.listen(port,()=>{
    console.log(`server is running on port:${port}`)
})
// mongodb connection
try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
} catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit the process with failure
}

 