var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/User";
import { Salt, jwtSecret, tokenTimer } from "../constants/secret";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
class AuthController {
    auth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let exists = yield User.exists({ email: req.body.email });
            console.log(req.body);
            if (!exists) {
                return res.status(401).send("user doesn't exist.");
            }
            let user = yield User.findOne({ email: req.body.email });
            const isValidPassword = compare(user.password, req.body.password + Salt);
            if (!isValidPassword) {
                return res.sendStatus(401);
            }
            const token = sign({ _id: user._id }, jwtSecret, { expiresIn: tokenTimer });
            console.log(token);
            return res.json({
                user,
                token,
            });
        });
    }
}
export default new AuthController();
