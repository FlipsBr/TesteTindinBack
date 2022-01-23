import { Schema, model, Document } from "mongoose";
interface ClassesInterface extends Document {
  name: string;
  description: string;
  video: string;
  date_init: Date;
  date_end: Date;
  date_updated: Date;
  total_comments: Number;
}
/* Sempre lembrar que string é uma instância de String.. */
const ClassesSchema = new Schema(
  {
    name: String,
    description: String,
    video: String,
    date_init: Date,
    date_end: Date,
    date_updated: Date,
    total_comments: Number,
  },
  {
    collection: "Classes",
    timestamps: true,
  }
);

ClassesSchema.methods.addComment = async function () {
  return this.total_comments++;
};

export default model<ClassesInterface>("Classes", ClassesSchema);
