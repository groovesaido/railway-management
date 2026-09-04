import { prisma } from "../lib/prisma.js";
import { Request, Response } from "express";
import * as prismaPkg from "../generated/prisma/client.js";
const { Prisma } = prismaPkg;

export const getStations = async (req: Request, res: Response) => {
  try {
    const stations = await prisma.station.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(stations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stations" });
  }
};
export const getStationById = async (req: Request, res: Response) => {
  try {
    const station = await prisma.station.findUnique({
      where: { id: req.params.id as string },
      include: { platforms: true },
    });
    if (!station) {
      res.status(404).json({ message: "Stadium not found" });
    }
    res.json(station);
    console.log(station);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stadium" });
  }
};

export const createStation = async (req: Request, res: Response) => {
  try {
    const { name, code, address, numberOfPlatforms } = req.body;
    if (
      !name ||
      !code ||
      !address ||
      numberOfPlatforms === undefined ||
      numberOfPlatforms === null
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const stadium = await prisma.station.create({
      data: { name, code, address, numberOfPlatforms },
    });
    res.status(201).json(stadium);
    console.log(stadium);
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return res
        .status(409)
        .json({ message: "A station with that code already exists" });
    }
    res.status(500).json({ message: "Failed to create station" });
  }
};
export const updateStadium = async (req: Request, res: Response) => {
  try {
    const { name, code, address, numberOfPlatforms, status } = req.body;

    const updateData: any = {};

    if (name !== undefined) updateData.name = name;
    if (code !== undefined) updateData.code = code;
    if (address !== undefined) updateData.address = address;
    if (status !== undefined) updateData.status = status;

    if (numberOfPlatforms !== undefined && numberOfPlatforms !== null) {
      updateData.numberOfPlatforms = Number(numberOfPlatforms);
    }

    const station = await prisma.station.update({
      where: { id: req.params.id as string },
      data: updateData,
    });

    return res.json(station);
  } catch (err) {
    console.error("Prisma Update Error Details:", err);

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res
          .status(409)
          .json({ message: "A station with that code already exists" });
      }
      if (err.code === "P2025") {
        return res.status(404).send();
      }
    }

    res.status(500).json({ message: "Failed to update station" });
  }
};
export const deleteStation = async (req: Request, res: Response) => {
  try {
    await prisma.station.delete({ where: { id: req.params.id as string } });
    res.status(204).json({ message: "Station deleted" });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return res.status(400).json({ message: "station not found" });
      }
      if (err.code === "P2003") {
        return res.status(409).json({
          message:
            "Cannot delete station with existing platforms,schedule or employees",
        });
      }
      res.status(500).json({ message: "Failed to delete station" });
    }
  }
};
