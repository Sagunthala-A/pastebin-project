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


app.get("/api/healthz", async (_req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI as string);
    }

    await mongoose.connection.db!.admin().ping();
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(200).json({ ok: false });
  }
});




app.use("/api", pasteRoutes);

export default app;
