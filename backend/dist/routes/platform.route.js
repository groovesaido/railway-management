import { deletePlatform, createPlatform, getPlatformById, getPlatformbyStation, updatePlatform, } from "../controllers/platform.controller";
import { Router } from "express";
const router = Router({ mergeParams: true });
router.get("/", getPlatformbyStation);
router.get("/:id", getPlatformById);
router.post("/", createPlatform);
router.put("/:id", updatePlatform);
router.delete("/:id", deletePlatform);
export default router;
