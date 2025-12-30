import { Router } from "express";
import { createPaste, getPaste } from "../controllers/paste.controller";

const router = Router();

router.post("/pastes", createPaste);
router.get("/pastes/:id", getPaste);

export default router;
