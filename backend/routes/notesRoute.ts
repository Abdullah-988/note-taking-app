import express from "express";
import {
  createNote,
  editNote,
  deleteNote,
  getNotes,
} from "../controllers/noteController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", protect, createNote);
router.put("/:id/edit", protect, editNote);
router.delete("/:id", protect, deleteNote);
router.get("/", protect, getNotes);

export default router;
