var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Salt } from "../constants/secret";
import User from "../models/User";
import hashPassword from "../utils/hashPassword";
class UserController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let users = yield User.find({});
                return res.status(200).send(users);
            }
            catch (error) {
                console.log(error);
                return res.status(400).send(error);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let exists = yield User.exists({ email: req.body.email });
            console.log(req.body);
            if (!exists) {
                try {
                    req.body.password = hashPassword(req.body.password + Salt);
                    let user = yield User.create(req.body);
                    console.log(user);
                    return res.status(200).json(user);
                }
                catch (error) {
                    console.log(error);
                    next(error);
                }
            }
            else
                return res.status(409).send("user already exits...");
        });
    }
}
export default new UserController();
