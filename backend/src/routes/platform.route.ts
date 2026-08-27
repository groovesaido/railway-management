import {
  deletePlatform,
  createPlatform,
  getPlatformById,
  getPlatformbyStation,
  updatePlatform,
} from "../controllers/platform.controller.js";
import { Router } from "express";

import { authenticate } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/requireRole.js";

const router = Router({ mergeParams: true });
router.get("/", getPlatformbyStation);
router.get("/:id", getPlatformById);
router.post("/", createPlatform);
router.put("/:id", updatePlatform);
router.delete("/:id", deletePlatform);

export default router;
