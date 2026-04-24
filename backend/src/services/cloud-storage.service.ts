import fs from "node:fs/promises";
import path from "node:path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { Express } from "express";

const getRequiredEnv = (name: string) => {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }

  return value;
};

let s3Client: S3Client | null = null;

const getS3Client = () => {
  if (s3Client) return s3Client;

  s3Client = new S3Client({
    region: getRequiredEnv("AWS_REGION"),
    credentials: {
      accessKeyId: getRequiredEnv("AWS_ACCESS_KEY_ID"),
      secretAccessKey: getRequiredEnv("AWS_SECRET_ACCESS_KEY"),
    },
  });

  return s3Client;
};

const sanitizeFileName = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9.-]/g, "-").replace(/-+/g, "-");

export const uploadToS3 = async (file: Express.Multer.File) => {
  const bucket = getRequiredEnv("AWS_S3_BUCKET");
  const region = getRequiredEnv("AWS_REGION");
  const s3 = getS3Client();

  const fileBuffer = await fs.readFile(file.path);
  const extension = path.extname(file.originalname) || ".jpg";
  const key = `garments/${Date.now()}-${sanitizeFileName(path.basename(file.originalname, extension))}${extension.toLowerCase()}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: fileBuffer,
      ContentType: file.mimetype,
    })
  );

  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};

