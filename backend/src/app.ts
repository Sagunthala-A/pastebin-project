import express from "express";
import cors from "cors";
import pasteRoutes from "./routes/paste.routes";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);


app.get("/api/healthz", (_req, res) => {
  res.status(200).json({ ok: mongoose.connection.readyState === 1 });
});

app.use("/api", pasteRoutes);

export default app;
