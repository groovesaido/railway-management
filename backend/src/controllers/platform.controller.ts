import { Response, Request } from "express";
import { PlatformStatus } from "../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import { Prisma } from "../generated/prisma/client";
// GET /api/admin/station/:stationId/platform
export const getPlatformbyStation = async (req: Request, res: Response) => {
  try {
    const { stationId } = req.params;
    if (Array.isArray(stationId))
      return res.status(400).json({ message: "Invalid station ID" });
    const station = await prisma.station.findUnique({
      where: { id: stationId },
    });
    if (!station) {
      res.status(404).json({ message: "Station not found" });
    }
    const platforms = await prisma.platform.findMany({
      where: { stationId },
      orderBy: { platformNumber: "asc" },
    });
    res.json(platforms);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch Platforms" });
  }
};

//GET /api/admin/station/:stationId/platform/:platformId
export const getPlatformById = async (req: Request, res: Response) => {
  try {
    const { stationId, id } = req.params;
    if (Array.isArray(id) || Array.isArray(stationId)) {
      return res.status(400).json({ message: "Invalid Format" });
    }
    const platform = await prisma.platform.findFirst({
      where: { id, stationId },
    });
    if (!platform)
      return res.status(404).json({ message: "Platform not found" });
    res.json(platform);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch Platforms" });
  }
};

// POST /api/admin/station/:stationId/platform
export const createPlatform = async (req: Request, res: Response) => {
  try {
    const { stationId } = req.params;
    if (Array.isArray(stationId))
      return res.status(400).json({ message: "Invalid station ID" });
    const { platformNumber, name, status } = req.body;
    if (!platformNumber || !name) {
      res.status(400).json({ message: "Missing required fields" });
    }
    if (status && !Object.values(PlatformStatus).includes(status))
      return res.status(400).json({ message: "Invalid Status value" });

    const station = await prisma.station.findUnique({
      where: { id: stationId },
    });
    if (!station) return res.status(404).json({ message: "Station not found" });
    const platform = await prisma.platform.create({
      data: {
        platformNumber,
        name,
        status: status ?? PlatformStatus.ACTIVE,
        stationId,
      },
    });
    res.status(201).json(platform);
  } catch (err) {
    res.status(500).json({ message: "Failed to create Platform" });
  }
};

// PUT /api/admin/station/:stationId/platform/:platfromId

export const updatePlatform = async (req: Request, res: Response) => {
  try {
    const { stationId, id } = req.params;
    const { platformNumber, name, status } = req.body;
    if (Array.isArray(id) || Array.isArray(stationId)) {
      return res.status(400).json({ message: "Invalid Format" });
    }
    const existing = await prisma.platform.findFirst({
      where: { id, stationId },
    });
    if (!existing)
      return res.status(404).json({ message: "Platform doesn't exist" });

    if (status && !Object.values(PlatformStatus).includes(status))
      return res.status(400).json({ message: "Invalid Status Value" });

    const updateData: any = {};
    if (platformNumber !== undefined)
      updateData.platformNumber = platformNumber;
    if (name !== undefined) updateData.name = name;
    if (status !== undefined) updateData.status = status;

    const platform = await prisma.platform.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json(platform);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res
          .status(409)
          .json({ message: "A platform with that code already exists" });
      }
      if (err.code === "P2025") {
        return res.status(404).json({ message: "Platform not found" });
      }
    }
    res.json({ message: "Failed to update Platform" });
  }
};

//DELETE /api/admin/station/:stationId/platform/:platformId

export const deletePlatform = async (req: Request, res: Response) => {
  try {
    const { id, stationId } = req.params;
    if (Array.isArray(id) || Array.isArray(stationId)) {
      return res.status(400).json({ message: "Invalid Format" });
    }
    const existing = await prisma.platform.findFirst({
      where: { id, stationId },
    });
    if (!existing)
      return res.status(404).json({ message: "Platform doesn't exist" });
    await prisma.platform.delete({
      where: { id },
    });
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return res.status(404).json({ message: "Platform not found" });
      }
      if (err.code === "P2003") {
        return res.status(409).json({
          message: "Cannot delete platform with existing schedules",
        });
      }
    }
    res.status(500).json({ message: "Failed to delete platform" });
  }
};
