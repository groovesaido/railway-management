import express, { Request, Response } from "express";
import dotenv from "dotenv";
import trainRoutes from "./routes/train.routes.js";
import passangerRoutes from "./routes/passanger.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminDashboardRoutes from "./routes/dashboard.route.js";
import station from "./routes/station.route.js";
import platform from "./routes/platform.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 3000;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

//routes
//train routes
app.use("/api/admin/train", trainRoutes);
//passanger routes
app.use("/api/passenger", passangerRoutes);
//user routes
app.use("/api/user", userRoutes);

//admin dashboard routes
app.use("/api/admin/dashboard", adminDashboardRoutes);

//admin station
app.use("/api/admin/station", station);

//admin platform
app.use("/api/admin/station/:stationId/platform", platform);
//user authentication routes
app.use("/api/auth/", authRoutes);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

