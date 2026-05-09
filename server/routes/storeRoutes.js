import express from "express";

import { protect, authorize } from "../middleware/authMiddleware.js";
import { createStrore } from "../controller/storeController.js";

const storeRouter = express.Router();

// Admin creates store
storeRouter.post("/create", protect, authorize("ADMIN"), createStrore);


export default storeRouter;