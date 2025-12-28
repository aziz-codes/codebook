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

import cors from "cors";
import middleware from "./auth.js";
import { connectToDB } from "./utils/db.js";
dotenv.config();
const app = express();

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "https://codebook-ss7a.vercel.app",
  "https://codebook-phi.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        process.env.NODE_ENV === "development"
      ) {
        callback(null, true);
      } else {
        // In production, allow all origins for now (you can restrict this later)
        callback(null, true);
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser()); // ✅ Add cookie parser before routes

// Middleware to ensure DB connection on each request (for serverless)
app.use(async (req, res, next) => {
  try {
    await connectToDB();
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Health check route (before other routes)
app.get("/", async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: "Welcome to Codebook API", status: "healthy" });
  } catch (error) {
    res.status(500).json({ message: "API error", error: error.message });
  }
});

app.get("/test", (req, res) => {
  res
    .status(200)
    .json({ message: "Codebook api is working now", cookies: req.cookies });
});

// Post routes
app.use("/post", middleware, attachBlockedUsers, postRoutes);
app.use("/post/comment", middleware, attachBlockedUsers, commentRoutes);
app.use("/post/report", middleware, reportRoutes);
app.use("/post/bookmark/", bookmakrRoutes);

app.use("/snippets", middleware, attachBlockedUsers, snippetRoutes);

// User routes
//login route
app.use("/login", authRoute);
app.use("/user", middleware, attachBlockedUsers, userRoute);
app.use("/user", followerRoutes);
app.use("/user", followersInitialRoute);
app.use("/user/", expertiseRoutes);

// ✅ Test Cookie Route
app.post("/test-auth", middleware, (req, res) => {
  console.log("your user is ", req.user.id);
  res.json({ user: req.user });
});

// Only start server if not in Vercel environment
if (process.env.VERCEL !== "1" && !process.env.VERCEL_ENV) {
  (async () => {
    try {
      await connectToDB();
      app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
      });
    } catch (error) {
      console.error("Failed to start server:", error);
    }
  })();
}

export default app;
