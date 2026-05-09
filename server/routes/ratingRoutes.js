import express from 'express';
import { authorize, protect } from '../middleware/authMiddleware.js';
import { submitRating } from '../controller/ratingController.js';

const ratingRouter = express.Router();

ratingRouter.post('/ratings',protect,authorize('USER'),submitRating);

export default ratingRouter;