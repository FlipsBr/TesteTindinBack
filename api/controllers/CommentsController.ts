import Comments from "../models/Comments";
import { Request, Response, NextFunction } from "express";
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

class CommentsController {
  /* Id não está na URL, logo, tem de vir do req.body... */
  /* Além de tudo, não faz muito sentido atrelar a criação do comentário a data de criação da aula.... */
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const date_created = new Date();
    try {
      const comment = await Comments.create({ ...req.body, date_created });
      return res.status(200).send(comment);
    } catch (error) {
      next(error);
    }
  }

  public async list(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      console.log("teste");
      const comments = await Comments.find();
      console.log(comments);
      return res.status(200).send(comments);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    console.log(req.params);
    try {
      console.log(typeof req.params);
      let deletedComment = await Comments.findByIdAndDelete(req.params._id);
      return res.status(200).send(deletedComment);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public async deleteOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      console.log("typeof req.params");
      let deletedComment = await Comments.findByIdAndDelete(
        new ObjectId("61ec8cb6f4d62c8b678a2397")
      );
      return res.status(200).send(deletedComment);
    } catch (error) {
      console.log(error);
      next(error);
    }
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
