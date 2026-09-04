import { Request, Response, NextFunction } from "express";
import * as prismaEnums from "../generated/prisma/enums.js";
const { Role } = prismaEnums;
type Role = (typeof prismaEnums)["Role"][keyof (typeof prismaEnums)["Role"]];
export const requireRole = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
