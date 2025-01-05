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
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";
dotenv.config();
const app = express();
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Use the CORS options
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/snippets", snippetRoutes);
app.use("/user", userRoute);
app.use("/user", followerRoutes);
app.use("/post", postRoutes);
app.use("/post/comment", commentRoutes);
app.use("/user", followersInitialRoute);
app.use("/user/", expertiseRoutes);
app.use("/bookmark/", bookmakrRoutes);
const port = 8000;
app.listen(port, () => {
  console.log(`server is running on port:${port}`);
});
// mongodb connection
try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected successfully");
} catch (error) {
  console.error("MongoDB connection error:", error.message);
  process.exit(1); // Exit the process with failure
}

app.post("/test", async (req, res) => {
  try {
    const sessionToken = req.cookies["next-auth.session-token"];
    if (!sessionToken) {
      return res.status(401).json({ message: "No session token found" });
    }

    // Decode the token (requires the secret used by NextAuth)
    const decodedToken = jwt.verify(sessionToken, process.env.NEXTAUTH_SECRET);

    console.log("Decoded Token:", decodedToken); // This contains the user info, e.g., userId, email, etc.

    res.status(200).json({ message: "Token decoded", user: decodedToken });
  } catch (err) {
    console.error("Error decoding token:", err);
    res.status(500).json({ message: "Failed to decode token" });
  }
});
