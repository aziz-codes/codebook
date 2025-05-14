import express from "express";
import { reportPost } from "../controllers/report.controller.js";

const router = express.Router();

router.post("/", reportPost);

export default router;
