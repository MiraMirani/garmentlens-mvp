import "dotenv/config";
import express from "express";
import cors from "cors";
import garmentsRouter from "./routes/garments.routes.js";



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

