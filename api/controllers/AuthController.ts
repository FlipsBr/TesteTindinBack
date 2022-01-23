import User from "../models/User";
import { NextFunction, Request, Response } from "express";
import { Salt, jwtSecret, tokenTimer } from "../constants/secret";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

class AuthController {
  public async auth(req: Request, res: Response, next: NextFunction) {
    let exists = await User.exists({ email: req.body.email });
    console.log(req.body);
    if (!exists) {
      return res.status(401).send("user doesn't exist.");
    }
    let user = await User.findOne({ email: req.body.email });
    const isValidPassword = compare(user.password, req.body.password + Salt);
    if (!isValidPassword) {
      return res.sendStatus(401);
    }

    let token = sign({ id: user._id }, jwtSecret, { expiresIn: tokenTimer });
    console.log("teste", token);
    return res.send({
      user,
      token,
    });
  }
}

export default new AuthController();
