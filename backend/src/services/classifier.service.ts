import { prisma } from "../prisma.js";
import { ClassifiedGarment } from "../types/garment.js";

const fakeClassifications: ClassifiedGarment[] = [
  {
    type: "t-shirt",
    damage: "small tear",
    material: "cotton",
    complexity: "low",
  },
  {
    type: "jeans",
    damage: "faded",
    material: "denim",
    complexity: "medium",
  },
  {
    type: "jacket",
    damage: "zipper broken",
    material: "polyester",
    complexity: "high",
  },
  {
    type: "dress",
    damage: "stain",
    material: "silk",
    complexity: "medium",
  },
  {
    type: "sweater",
    damage: "pilling",
    material: "wool",
    complexity: "low",
  },
];

export const classifyGarment = async (
  _imagePath: string
): Promise<ClassifiedGarment> => {
  const processingTime = 1000 + Math.random() * 2000;
  await new Promise((resolve) => setTimeout(resolve, processingTime));

  const randomIndex = Math.floor(Math.random() * fakeClassifications.length);
  return fakeClassifications[randomIndex];
};

export const classifyInBackground = async (
  garmentId: number,
  imagePath: string
) => {
  // Wait 30 seconds to simulate processing
  await new Promise((resolve) => setTimeout(resolve, 30000));

  try {
    const classification = await classifyGarment(imagePath);

    await prisma.garment.update({
      where: { id: garmentId },
      data: {
        status: "classified",
        type: classification.type,
        damage: classification.damage,
        material: classification.material,
        complexity: classification.complexity,
      },
    });
  } catch (error) {
    console.error(`Failed to classify garment ${garmentId}:`, error);
  }
};
