import * as prismaEnums from "../generated/prisma/enums.js";
const { Role } = prismaEnums;
export const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};
