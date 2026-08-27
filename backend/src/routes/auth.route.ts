import { Router } from "express";
import {
  loginHandler,
  logoutHandler,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", loginHandler);
router.post("/logout", logoutHandler);
router.get("/me", authenticate, getCurrentUser);
export default router;
