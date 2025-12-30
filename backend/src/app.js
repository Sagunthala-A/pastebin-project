"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const paste_routes_1 = __importDefault(require("./routes/paste.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.BASE_URL,
    methods: ["GET", "POST"]
}));
app.get("/api/healthz", (_req, res) => {
    res.status(200).json({ ok: true });
});
app.use("/api", paste_routes_1.default);
exports.default = app;
