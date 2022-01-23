var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Schema, model } from "mongoose";
/* Sempre lembrar que string é uma instância de String.. */
const ClassesSchema = new Schema({
    name: String,
    description: String,
    video: String,
    date_init: Date,
    date_end: Date,
    date_updated: Date,
    total_comments: Number,
}, {
    collection: "Classes",
    timestamps: true,
});
ClassesSchema.methods.addComment = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return this.total_comments++;
    });
};
export default model("Classes", ClassesSchema);
