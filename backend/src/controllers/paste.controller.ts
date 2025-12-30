import { Request, Response } from "express";
import { createPasteService, fetchPasteService } from "../services/paste.service";

export async function createPaste(req: Request, res: Response) {
  const { content, ttl_seconds, max_views } = req.body;

  if (typeof content !== "string" || content.trim().length === 0) {
    return res.status(400).json({ error: "content is required" });
  }

  if (
    ttl_seconds !== undefined &&
    (!Number.isInteger(ttl_seconds) || ttl_seconds <= 0)
  ) {
    return res.status(400).json({ error: "invalid ttl_seconds" });
  }

  if (
    max_views !== undefined &&
    (!Number.isInteger(max_views) || max_views <= 0)
  ) {
    return res.status(400).json({ error: "invalid max_views" });
  }

  const paste = await createPasteService(req);

  res.status(201).json({
    id: paste._id.toString(),
    url: `${process.env.BASE_URL}/p/${paste._id.toString()}`,
  });
}

export async function getPaste(req: Request, res: Response) {
  const paste = await fetchPasteService(req);
  if (!paste) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json({
    content: paste.content,
    remaining_views: paste.remainingViews ?? null,
    expires_at: paste.expiresAt ?? null,
  });
}
