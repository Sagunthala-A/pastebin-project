import { Request } from "express";
import { connectDB } from "../config/db";
import Paste from "../models/Paste";
import { getNow } from "../utils/time";

export async function createPasteService(req: Request) {
  await connectDB();

  const paste = await Paste.create({
    content: req.body.content,
    expiresAt: req.body.ttl_seconds
      ? new Date(Date.now() + req.body.ttl_seconds * 1000)
      : null,
    remainingViews: req.body.max_views ?? null,
  });

  return paste;
}

export async function fetchPasteService(req: Request) {
    await connectDB();
  const paste = await Paste.findById(req.params.id);
  if (!paste) return null;

  const now = getNow(req);

  if (paste.expiresAt && paste.expiresAt <= now) return null;

  if (paste.remainingViews != null) {
    if (paste.remainingViews <= 0) return null;
    paste.remainingViews -= 1;
    await paste.save();
  }

  return paste;
}

