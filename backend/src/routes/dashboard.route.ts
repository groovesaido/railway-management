import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/requireRole.js";

import {
  getDashboardStats,
  getRevenueTrend,
  getOccupancyByClass,
  getBookingByRoute,
} from "../controllers/dashboard.controller.js";

const router = Router();
router.use(authenticate, requireRole("ADMIN"));

router.get("/stats", getDashboardStats);
router.get("/revenue", getRevenueTrend);
router.get("/occupancy", getOccupancyByClass);
router.get("/booking-by-route", getBookingByRoute);

export default router;
