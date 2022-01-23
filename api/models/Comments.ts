import { Schema, model, Document, ObjectId, SchemaTypes } from "mongoose";
import Classes from "./Classes";

interface CommentInterface extends Document {
  id_class: ObjectId;
  comment: string;
  date_created: Date;
}

const CommentSchema = new Schema(
  {
    id_class: { type: Schema.Types.ObjectId, ref: Classes },
    comment: { type: String, required: true },
    date_created: { type: Date, required: true },
  },
  {
    collection: "Comments",
    timestamps: true,
  }
);

export default model<CommentInterface>("Comment", CommentSchema);
