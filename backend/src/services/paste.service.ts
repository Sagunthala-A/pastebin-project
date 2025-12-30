import Paste from "../models/Paste";
import { Request } from "express";
import { getNow } from "../utils/time";

export async function createPasteService(req: Request) {
  const { content, ttl_seconds, max_views } = req.body;

  const now = getNow(req);

  const expiresAt =
    typeof ttl_seconds === "number"
      ? new Date(now.getTime() + ttl_seconds * 1000)
      : null;

  const paste = await Paste.create({
    content,
    expiresAt,
    remainingViews: typeof max_views === "number" ? max_views : null,
  });

  return paste;
}

export async function fetchPasteService(req: Request) {
    console.log("heyyy",req)
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
