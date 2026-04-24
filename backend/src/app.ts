import "dotenv/config";
import express from "express";
import cors from "cors";



export const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.get("/health", (_req, res) => {
        res.json({ ok: true , time: new Date() });
    });

    return app;
};

