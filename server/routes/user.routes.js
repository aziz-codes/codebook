// server/routes/authRoutes.js

import express from "express";
import {
  checkOnBoard,
  checkUsername,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/developers/:token", getAllUsers);
router.post("/onboard", checkOnBoard);
router.get("/:username", getUser);
router.post("/check-username/:username", checkUsername);
router.patch("/:id", updateUser);

export default router;
