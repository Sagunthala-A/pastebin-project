"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaste = createPaste;
exports.getPaste = getPaste;
const paste_service_1 = require("../services/paste.service");

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";
async function createPaste(req, res) {
    const { content, ttl_seconds, max_views } = req.body;
    if (typeof content !== "string" || content.trim().length === 0) {
        return res.status(400).json({ error: "content is required" });
    }
    if (ttl_seconds !== undefined &&
        (!Number.isInteger(ttl_seconds) || ttl_seconds <= 0)) {
        return res.status(400).json({ error: "invalid ttl_seconds" });
    }
    if (max_views !== undefined &&
        (!Number.isInteger(max_views) || max_views <= 0)) {
        return res.status(400).json({ error: "invalid max_views" });
    }
    const paste = await (0, paste_service_1.createPasteService)(req);
    res.status(201).json({
        id: paste._id.toString(),
        url: `${BASE_URL}/p/${paste._id.toString()}`,
    });
}
async function getPaste(req, res) {
    const paste = await (0, paste_service_1.fetchPasteService)(req);
    if (!paste) {
        return res.status(404).json({ error: "Not found" });
    }
    res.json({
        content: paste.content,
        remaining_views: paste.remainingViews ?? null,
        expires_at: paste.expiresAt ?? null,
    });
}
