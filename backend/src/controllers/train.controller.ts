import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

//GET all trains
export const getTrains = async (req: Request, res: Response) => {
  try {
    const trains = await prisma.train.findMany();
    res.status(200).json(trains);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the trains" });
  }
};

//GET a single train by id
export const getTrainById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const train = await prisma.train.findUnique({ where: { id } });
    if (!train) return res.status(404).json({ error: "train not found" });
    res.json(train);
  } catch (error) {
    res.status(500).json({ error: "failed to fetch train" });
  }
};

//POST create train
export const createTrain = async (req: Request, res: Response) => {
  try {
    const {
      trainNumber,
      name,
      type,
      capacity,
      manufacturer,
      model,
      yearBuilt,
    } = req.body;
    const train = await prisma.train.create({
      data: {
        trainNumber,
        name,
        type,
        capacity,
        manufacturer,
        model,
        yearBuilt,
      },
    });
    res.status(201).json({ message: "Train created" });
  } catch (error) {
    res.status(500).json({ error: "failed to create the train" });
  }
};

//PUT update train
export const updateTrain = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const {
      trainNumber,
      name,
      type,
      capacity,
      manufacturer,
      model,
      yearBuilt,
    } = req.body;
    const train = await prisma.train.update({
      where: { id },
      data: {
        trainNumber,
        name,
        type,
        capacity,
        manufacturer,
        model,
        yearBuilt,
      },
    });
    res.status(200).json({ message: "Train updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update train" });
  }
};
//DELETE train

export const deleteTrain = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    await prisma.train.delete({ where: { id } });
    res.status(204).json({ message: "Train deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete train" });
  }
};
