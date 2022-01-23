import { NextFunction, Request, Response } from "express";
import { Salt } from "../constants/secret";
import User from "../models/User";
import hashPassword from "../utils/hashPassword";
class UserController {
  email: string;
  password: string;

  public async list(req: Request, res: Response): Promise<any> {
    try {
      let users = await User.find({});
      return res.status(200).send(users);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    let exists = await User.exists({ email: req.body.email });
    console.log(req.body);
    if (!exists) {
      try {
        req.body.password = hashPassword(req.body.password + Salt);
        let user = await User.create(req.body);
        console.log(user);
        return res.status(200).json(user);
      } catch (error) {
        console.log(error);
        next(error);
      }
    } else return res.status(409).send("user already exits...");
  }
}

export default new UserController();
