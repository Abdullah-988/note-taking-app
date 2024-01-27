import { InferSchemaType, model, Schema } from "mongoose";

const noteSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    content: {
      type: String,
      required: [true, "Please add a content"],
    },
  },
  {
    timestamps: true,
  }
);

type Note = InferSchemaType<typeof noteSchema>;

export const Note = model<Note>("Note", noteSchema);
