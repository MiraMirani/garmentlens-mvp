import fs from "node:fs";
import path from "node:path";
import multer from "multer";

const uploadDir = path.resolve("uploads");
fs.mkdirSync(uploadDir, { recursive: true });

export const upload = multer({
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, uploadDir),
        filename: (_req, file, cb) =>
            cb(null, `${Date.now()}-${file.originalname}`),
    }),
});