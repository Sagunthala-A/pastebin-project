"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PasteSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        default: null,
    },
    remainingViews: {
        type: Number,
        default: null,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Paste", PasteSchema);
