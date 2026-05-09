import express from "express";

import { protect, authorize } from "../middleware/authMiddleware.js";
import { createStrore, getAllStores } from "../controller/storeController.js";

const storeRouter = express.Router();

// Admin creates store
storeRouter.post("/create", protect, authorize("ADMIN"), createStrore);
storeRouter.get('/detail',protect,authorize("USER"),getAllStores);


export default storeRouter;