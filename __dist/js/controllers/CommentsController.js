var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Comments from "../models/Comments";
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
class CommentsController {
    /* Id não está na URL, logo, tem de vir do req.body... */
    /* Além de tudo, não faz muito sentido atrelar a criação do comentário a data de criação da aula.... */
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const date_created = new Date();
            try {
                const comment = yield Comments.create(Object.assign(Object.assign({}, req.body), { date_created }));
                return res.status(200).send(comment);
            }
            catch (error) {
                next(error);
            }
        });
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("teste");
                const comments = yield Comments.find();
                console.log(comments);
                return res.status(200).send(comments);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            try {
                console.log(typeof req.params);
                let deletedComment = yield Comments.findByIdAndDelete(req.params._id);
                return res.status(200).send(deletedComment);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    deleteOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("typeof req.params");
                let deletedComment = yield Comments.findByIdAndDelete(new ObjectId("61ec8cb6f4d62c8b678a2397"));
                return res.status(200).send(deletedComment);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
}
export default new CommentsController();
/*
POST
/classes/comments
Cadastrar um comentário de uma aula (*3)
GET
/classes/comments
Listar todos os comentários de uma aula
DELETE
/classes/comments/:id
Excluir um comentário
*/
