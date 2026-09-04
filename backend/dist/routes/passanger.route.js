import { Router } from "express";
import { getPassengers, getPassengerById, createPassenger, deletePassenger, } from "../controllers/passanger.controller.js";
const router = Router();
router.get("/", getPassengers);
router.get("/:id", getPassengerById);
router.post("/", createPassenger);
router.delete("/:id", deletePassenger);
export default router;
