import dotenv from 'dotenv';
import express from 'express'
import snippetRoutes from './routes/snippets-routes.js';

dotenv.config();
const url = process.env.MONGO_URI;

const app = express();
app.use(express.json())
app.use("/snippets",snippetRoutes)
const port = 8000;

app.listen(port,()=>{
    console.log(`server is running on port:${port}`)
})
 