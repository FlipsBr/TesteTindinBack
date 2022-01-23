import { NextFunction, Request, Response } from "express";
import checkIfDate from "../utils/checkIfDate";
import Classes from "../models/Classes";

class ClassesController {
  public async list(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      let classes = await Classes.find();
      return res.status(200).send(classes);
    } catch (error) {
      next(error);
    }
  }

  public async selectOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      let selectedClasses = await Classes.findById(req.body.id);
      return res.status(200).json(selectedClasses);
    } catch (error) {
      next(error);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    let condicional = (
      date_ini: string,
      date_end: string,
      date_created: string,
      date_updated: string
    ) => {
      checkIfDate(date_ini) &&
        checkIfDate(date_end) &&
        checkIfDate(date_created) &&
        checkIfDate(date_updated);
    };
    if (condicional) {
      try {
        let classes = await Classes.create(req.body);
        return res.status(200).send(classes);
      } catch (error) {
        next(error);
      }
    } else return res.status(400).send("Data Inválida.");
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    let condicional = (
      date_ini: string,
      date_end: string,
      date_created: string
    ) => {
      checkIfDate(date_ini) &&
        checkIfDate(date_end) &&
        checkIfDate(date_created);
    };
    req.body.date_updated = new Date().toString();
    console.log(req.body);
    console.log(condicional);
    if (condicional) {
      try {
        let classes = await Classes.updateOne({ _id: req.body._id }, req.body, {
          upsert: true,
        });
        return res.status(200).send(classes);
      } catch (error) {
        next(error);
      }
    } else return res.status(400).send("Data Inválida.");
  }

  public async deleteOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      let selectedClasses = await Classes.findByIdAndDelete(req.params.id);
      return res.status(200).json(selectedClasses);
    } catch (error) {
      next(error);
    }
  }
}

export default new ClassesController();

/*
POST
/classes
Criar uma nova aula 
GET
/classes
Listar aulas cadastradas (*1)
GET
/classes/:id
Obter detalhes de uma aula pelo o id (*2)
PUT
/classes
Atualizar o cadastro de uma aula
*/
