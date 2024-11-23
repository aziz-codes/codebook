import dotenv from 'dotenv';
import express from 'express'
import snippetRoutes from './routes/snippets-routes.js';
import userRoute from './routes/user-routes.js';
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js'
import mongoose from 'mongoose';
import cors from 'cors';
dotenv.config();
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  // Use the CORS options
  app.use(cors(corsOptions));


app.use(express.json())
app.use("/snippets",snippetRoutes)
app.use("/user",userRoute);
app.use("/post",postRoutes);
app.use("/post/comment",commentRoutes);
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

 