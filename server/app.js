import dotenv from "dotenv";
import express from "express";
import snippetRoutes from "./routes/snippets.routes.js";
import userRoute from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import followerRoutes from "./routes/follower.routes.js";
import followersInitialRoute from "./routes/utils.routes.js";
import expertiseRoutes from "./routes/expertise.routes.js";
import bookmakrRoutes from "./routes/bookmark.routes.js";
import reportRoutes from "./routes/reports.route.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
// middlewares
import { attachBlockedUsers } from "./middlewares/blockMiddleware.js";
import mongoose from "mongoose";
import cors from "cors";
import middleware from "./auth.js";
import { connectToDB } from "./utils/db.js";
dotenv.config();
const app = express();

// ✅ Apply Middleware in Correct Order
const allowedOrigins = [
  "http://localhost:3000",
  "https://codebook-frontend-five.vercel.app",
  "https://codebook-ss7a.vercel.app/",
];
// ✅ Apply Middleware in Correct Order

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser()); // ✅ Add cookie parser before routes

// Post routes
app.use("/post", middleware, attachBlockedUsers, postRoutes);
app.use("/post/comment", middleware, attachBlockedUsers, commentRoutes);
app.use("/post/report", middleware, reportRoutes);
app.use("/post/bookmark/", bookmakrRoutes);

app.use("/snippets", snippetRoutes);

// User routes
//login route
app.use("/login", authRoute);
app.use("/user", middleware, attachBlockedUsers, userRoute);
app.use("/user", followerRoutes);
app.use("/user", followersInitialRoute);
app.use("/user/", expertiseRoutes);

await connectToDB();
// ✅ Test Cookie Route
app.post("/test", middleware, (req, res) => {
  console.log("your user is ", req.user.id);

  res.json({ user: req.user });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Codebook API" });
});

app.get("/test", (req, res) => {
  res
    .status(200)
    .json({ message: "Codebook api is working now", cookies: req.cookies });
});
