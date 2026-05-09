import express from  'express';
import { authorize, protect } from '../middleware/authMiddleware.js';
import {
  adminDashboard,
  getAllStoresForAdmin,
  getAllUsersForAdmin,
  ownerdashboard,
} from '../controller/dashboardController.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/admin/summary', protect, authorize("ADMIN"), adminDashboard);
dashboardRouter.get('/admin/users', protect, authorize("ADMIN"), getAllUsersForAdmin);
dashboardRouter.get('/admin/stores', protect, authorize("ADMIN"), getAllStoresForAdmin);
dashboardRouter.get('/owner', protect, authorize("STORE_OWNER"), ownerdashboard);

export default dashboardRouter;
