import express from "express";
import cors from "cors";
import pasteRoutes from "./routes/paste.routes";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.BASE_URL,
    methods: ["GET", "POST"]
  })
);

app.get("/api/healthz", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/api", pasteRoutes);

export default app;
