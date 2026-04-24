import { Router } from "express";
import multer from "multer";
import { uploadGarment, listGarments } from "../controllers/garments.controller.js";
import { upload } from "../services/storage.service.js";

const garmentsRouter = Router();

garmentsRouter.get("/", listGarments);
garmentsRouter.post("/", (req, res, next) => {
  upload.single("image")(req, res, (error) => {
	if (!error) {
	  next();
	  return;
	}

	if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
	  res.status(400).json({ message: "File is too large. Max size is 2 MB." });
	  return;
	}

	const message = error instanceof Error ? error.message : "Invalid upload file";
	res.status(400).json({ message });
  });
}, uploadGarment);

export default garmentsRouter;

