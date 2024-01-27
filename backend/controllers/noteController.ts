import { Response } from "express";
import { Note } from "../models/noteModel";
import { Types } from "mongoose";
import { RequestWithUser } from "../types";

// @desc    Create new note
// @route   POST /api/notes/create
// @access  Private
export const createNote = async (req: RequestWithUser, res: Response) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).send("Missing required fields");
    }

    const newNote = await Note.create({
      owner: req.user,
      title,
      content,
    });

    return res.status(201).json(newNote);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

// @desc    Edit a note
// @route   POST /api/notes/:id/edit
// @access  Private
export const editNote = async (req: RequestWithUser, res: Response) => {
  try {
    const { title, content } = req.body;
    const noteId = req.params.id;

    if (!title || !content) {
      return res.status(400).send("Missing required fields");
    }

    if (!Types.ObjectId.isValid(noteId)) {
      return res.status(404).send("Invalid note id");
    }

    const note = await Note.findById(noteId).populate("owner");

    if (!note) {
      return res.status(404).send("Note not found");
    }

    if (note.owner._id.toString() != req.user._id.toString()) {
      return res.status(403).send("Forbidden");
    }

    const editedNote = await Note.findByIdAndUpdate(noteId, { title, content });

    return res.status(200).send(editedNote);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
export const deleteNote = async (req: RequestWithUser, res: Response) => {
  try {
    const noteId = req.params.id;

    if (!Types.ObjectId.isValid(noteId)) {
      return res.status(404).send("Invalid note id");
    }

    const note = await Note.findById(noteId).populate("owner");

    if (!note) {
      return res.status(404).send("Note not found");
    }

    if (note.owner._id.toString() != req.user._id.toString()) {
      return res.status(403).send("Forbidden");
    }

    const deletedNote = await Note.findByIdAndDelete(noteId);

    return res.status(200).send(deletedNote);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

// @desc    Get user notes
// @route   GET /api/notes
// @access  Private
export const getNotes = async (req: RequestWithUser, res: Response) => {
  try {
    const notes = await Note.find({ owner: req.user._id });

    return res.status(200).json(notes);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};
