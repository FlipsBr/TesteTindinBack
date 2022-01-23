import { Schema, model } from "mongoose";
import Classes from "./Classes";
const CommentSchema = new Schema({
    id_class: { type: Schema.Types.ObjectId, ref: Classes },
    comment: { type: String, required: true },
    date_created: { type: Date, required: true },
}, {
    collection: "Comments",
    timestamps: true,
});
export default model("Comment", CommentSchema);
