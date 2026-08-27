import { prisma } from "../lib/prisma";
import { Prisma } from "../generated/prisma/client";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();
//POST create a new user
export const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role, phone } = req.body;
        const saltRounds = Number(process.env.saltRounds);
        const hashedPassword = await bcrypt.hash(password, saltRounds || 10);
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                hashedPassword,
                role,
                phone,
            },
        });
        console.log(user);
        res.status(201).json({ message: `User Created type ${user.role}` });
    }
    catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                return res
                    .status(409)
                    .json({ error: "User already exists with the same email" });
            }
        }
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    }
};
