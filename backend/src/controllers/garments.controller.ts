import type { Request, Response } from "express";
import { prisma } from "../prisma.js";
import { classifyInBackground } from "../services/classifier.service.js";

const toOptionalString = (value: unknown) => {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

export const listGarments = async (_req: Request, res: Response) => {
  try {
    const garments = await prisma.garment.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      result: garments,
      message: "Garments retrieved successfully",
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: "Something went wrong",
      error: true,
    });
  }
};

export const uploadGarment = async (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "Image file is required" });
  }

  const imagePath = `/uploads/${file.filename}`;

  // Create garment with processing status
  const garment = await prisma.garment.create({
    data: {
      imagePath,
      status: "processing",
      type: null,
      damage: null,
      material: null,
      complexity: null,
      classifier: null,
    },
  });

  void classifyInBackground(garment.id, imagePath)
      .then(() => {

      })
      .catch((error) => {
      //   handle catch if needed, e.g. log error
      });

  return res.status(201).json(garment);
};
