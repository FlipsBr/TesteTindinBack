var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import checkIfDate from "../utils/checkIfDate";
import Classes from "../models/Classes";
class ClassesController {
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let classes = yield Classes.find();
                return res.status(200).send(classes);
            }
            catch (error) {
                next(error);
            }
        });
    }
    selectOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let selectedClasses = yield Classes.findById(req.body.id);
                return res.status(200).json(selectedClasses);
            }
            catch (error) {
                next(error);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let condicional = (date_ini, date_end, date_created, date_updated) => {
                checkIfDate(date_ini) &&
                    checkIfDate(date_end) &&
                    checkIfDate(date_created) &&
                    checkIfDate(date_updated);
            };
            if (condicional) {
                try {
                    let classes = yield Classes.create(req.body);
                    return res.status(200).send(classes);
                }
                catch (error) {
                    next(error);
                }
            }
            else
                return res.status(400).send("Data Inválida.");
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let condicional = (date_ini, date_end, date_created) => {
                checkIfDate(date_ini) &&
                    checkIfDate(date_end) &&
                    checkIfDate(date_created);
            };
            req.body.date_updated = new Date().toString();
            console.log(req.body);
            console.log(condicional);
            if (condicional) {
                try {
                    let classes = yield Classes.updateOne({ _id: req.body._id }, req.body, {
                        upsert: true,
                    });
                    return res.status(200).send(classes);
                }
                catch (error) {
                    next(error);
                }
            }
            else
                return res.status(400).send("Data Inválida.");
        });
    }
    deleteOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let selectedClasses = yield Classes.findByIdAndDelete(req.params.id);
                return res.status(200).json(selectedClasses);
            }
            catch (error) {
                next(error);
            }
        });
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
