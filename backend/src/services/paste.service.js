"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPasteService = createPasteService;
exports.fetchPasteService = fetchPasteService;
const Paste_1 = __importDefault(require("../models/Paste"));
const time_1 = require("../utils/time");
async function createPasteService(req) {
    const { content, ttl_seconds, max_views } = req.body;
    const now = (0, time_1.getNow)(req);
    const expiresAt = typeof ttl_seconds === "number"
        ? new Date(now.getTime() + ttl_seconds * 1000)
        : null;
    const paste = await Paste_1.default.create({
        content,
        expiresAt,
        remainingViews: typeof max_views === "number" ? max_views : null,
    });
    return paste;
}
async function fetchPasteService(req) {
    console.log("heyyy", req);
    const paste = await Paste_1.default.findById(req.params.id);
    if (!paste)
        return null;
    const now = (0, time_1.getNow)(req);
    if (paste.expiresAt && paste.expiresAt <= now)
        return null;
    if (paste.remainingViews != null) {
        if (paste.remainingViews <= 0)
            return null;
        paste.remainingViews -= 1;
        await paste.save();
    }
    return paste;
}
