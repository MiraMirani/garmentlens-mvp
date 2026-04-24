import path from "node:path";
import { config as loadEnv } from "dotenv";
import express from "express";
import cors from "cors";
import garmentsRouter from "./routes/garments.routes.js";

loadEnv();
loadEnv({
    path: path.resolve(process.cwd(), "src/.env"),
    override: false,
});


export const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use("/uploads", express.static("uploads"));
    app.use("/garments", garmentsRouter);

    app.get("/health", (_req, res) => {
        res.json({ ok: true , time: new Date() });
    });

    return app;
};

