import { prisma } from "../lib/prisma.js";
import * as prismaPkg from "../generated/prisma/client.js";
const { Prisma } = prismaPkg;
//GET all passengers
export const getPassengers = async (req, res) => {
    try {
        const passengers = await prisma.passenger.findMany();
        res.status(200).json(passengers);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch passengers" });
    }
};
//Get passenger by id
export const getPassengerById = async (req, res) => {
    try {
        const { id } = req.params;
        const passenger = await prisma.passenger.findUnique({
            where: { id },
        });
        res.status(200).json(passenger);
    }
    catch {
        res.status(500).json({ error: "Failed to fetch passenger" });
    }
};
//POST create new passenger
export const createPassenger = async (req, res) => {
    try {
        const { email, firstName, lastName, idNumber, dateOfBirth, phoneNumber } = req.body;
        const passenger = await prisma.passenger.create({
            data: {
                email,
                firstName,
                lastName,
                idNumber,
                dateOfBirth: new Date(dateOfBirth),
                phoneNumber,
            },
        });
        res.status(201).json({ message: "passenger Created successfully" });
    }
    catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                return res
                    .status(409)
                    .json({ error: "passanger already exists with the same email" });
            }
        }
        return res.status(500).json({ error: "Failed to create passenger" });
    }
};
//DELETE passenger
export const deletePassenger = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.passenger.delete({ where: { id } });
        res.status(204).json({ message: "Passenger deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete passenger" });
    }
};
