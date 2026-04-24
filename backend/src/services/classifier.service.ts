import fs from "node:fs/promises";
import path from "node:path";
import OpenAI from "openai";
import { prisma } from "../prisma.js";
import type { ClassifiedGarment } from "../types/garment.js";

const MODEL = "gpt-4o-mini";

const fakeClassifications: Omit<ClassifiedGarment, "classifier">[] = [
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

const mimeTypes: Record<string, string> = {
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

const getOpenAI = () => {
  if (!process.env.OPENAI_API_KEY) return null;

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

const UNDEFINED_VALUE = "undefined";

const fakeClassifyGarment = async (): Promise<ClassifiedGarment> => {
  const processingTime = 1000 + Math.random() * 2000;
  await new Promise((resolve) => setTimeout(resolve, processingTime));

  const randomIndex = Math.floor(Math.random() * fakeClassifications.length);
  return {
    ...fakeClassifications[randomIndex],
    classifier: "fikseAi",
  };
};

const toLocalFilePath = (imagePath: string) => {
  const localPath = imagePath.startsWith("/uploads/")
    ? imagePath.slice(1)
    : imagePath;

  return path.isAbsolute(localPath) ? localPath : path.resolve(localPath);
};

const toDataUrl = async (imagePath: string) => {
  const filePath = toLocalFilePath(imagePath);
  const ext = path.extname(filePath).toLowerCase();
  const mimeType = mimeTypes[ext] ?? "image/jpeg";
  const image = await fs.readFile(filePath);

  return `data:${mimeType};base64,${image.toString("base64")}`;
};

const normalizeField = (value: unknown) => {
  if (typeof value !== "string") return UNDEFINED_VALUE;

  const trimmed = value.trim().toLowerCase();
  if (trimmed.length === 0) return UNDEFINED_VALUE;

  if (["unknown", "n/a", "na", "null", "none", "undefined"].includes(trimmed)) {
    return UNDEFINED_VALUE;
  }

  return trimmed;
};

export const classifyGarment = async (
  imagePath: string
): Promise<ClassifiedGarment> => {
  const openai = getOpenAI();

  if (!openai) {
    console.warn("OpenAI disabled: OPENAI_API_KEY is missing. Using fikseAi fallback.");
    return fakeClassifyGarment();
  }

  try {
    const imageUrl = await toDataUrl(imagePath);
    const response = await openai.chat.completions.create({
      model: MODEL,
      temperature: 0,
      max_tokens: 200,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            [
              "You classify garment photos for repair triage.",
              "Return ONLY valid JSON with string fields: type, damage, material, complexity.",
              "If the image is irrelevant (not a garment, clothing accessory, or repairable fashion item), return \"undefined\" for every field.",
              "If you are uncertain about a field, return \"undefined\" for that field.",
              "Example relevant: {\"type\":\"jacket\",\"damage\":\"zipper broken\",\"material\":\"polyester\",\"complexity\":\"high\"}",
              "Example irrelevant: {\"type\":\"undefined\",\"damage\":\"undefined\",\"material\":\"undefined\",\"complexity\":\"undefined\"}",
            ].join(" "),
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Classify this garment for repair and resale triage.",
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
                detail: "low",
              },
            },
          ],
        },
      ],
    });

    const content = response.choices[0]?.message.content;
    if (!content) {
      throw new Error("OpenAI returned an empty classification");
    }

    let parsed: Partial<ClassifiedGarment>;

    try {
      parsed = JSON.parse(content) as Partial<ClassifiedGarment>;
    } catch {
      throw new Error(`OpenAI returned non-JSON content: ${content.slice(0, 200)}`);
    }

    return {
      type: normalizeField(parsed.type),
      damage: normalizeField(parsed.damage),
      material: normalizeField(parsed.material),
      complexity: normalizeField(parsed.complexity),
      classifier: "chatGpt",
    };
  } catch (error) {
    console.error("OpenAI classification failed, using fikseAi fallback:", error);
    return fakeClassifyGarment();
  }
};

export const classifyInBackground = async (
  garmentId: number,
  imagePath: string
) => {
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
        classifier: classification.classifier,
      },
    });
  } catch (error) {
    console.error(`Failed to classify garment ${garmentId}:`, error);
  }
};
