import fs from "node:fs";
import path from "node:path";
import multer from "multer";

const uploadDir = path.resolve("uploads");

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export const upload = multer({
    limits: {
        fileSize: MAX_FILE_SIZE_BYTES,
    },
    fileFilter: (_req, file, cb) => {
        if (!ALLOWED_IMAGE_TYPES.has(file.mimetype)) {
            cb(new Error("Only JPG, PNG, and WEBP images are allowed."));
            return;
        }

        cb(null, true);
    },
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => {
            fs.mkdir(uploadDir, { recursive: true }, (error) => {
                if (error) {
                    cb(error, uploadDir);
                    return;
                }

                cb(null, uploadDir);
            });
        },
        filename: (_req, file, cb) =>
            cb(null, `${Date.now()}-${file.originalname}`),
    }),
});