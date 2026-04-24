import { Router } from "express";
import { uploadGarment, listGarments } from "../controllers/garments.controller.js";
import { upload } from "../services/storage.service.js";

const garmentsRouter = Router();

garmentsRouter.get("/", listGarments);
garmentsRouter.post("/", upload.single("image"), uploadGarment);

export default garmentsRouter;

