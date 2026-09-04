import { Router } from "express";
import { getTrains, getTrainById, createTrain, updateTrain, deleteTrain, } from "../controllers/train.controller.js";
const router = Router();
router.get("/", getTrains);
router.get("/:id", getTrainById);
router.post("/", createTrain);
router.put("/:id", updateTrain);
router.delete("/:id", deleteTrain);
export default router;
