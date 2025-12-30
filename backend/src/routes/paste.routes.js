"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paste_controller_1 = require("../controllers/paste.controller");
const router = (0, express_1.Router)();
router.post("/pastes", paste_controller_1.createPaste);
router.get("/pastes/:id", paste_controller_1.getPaste);
exports.default = router;
