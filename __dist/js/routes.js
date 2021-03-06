import { Router } from "express";
import UserController from "./controllers/UserController";
import ClassesController from "./controllers/ClassesController";
import CommentsController from "./controllers/CommentsController";
import AuthController from "./controllers/AuthController";
const routes = Router();
routes.get("/users", UserController.list);
routes.post("/users", UserController.create);
routes.get("/classes", ClassesController.list);
routes.get("/classes/:id", ClassesController.selectOne);
routes.delete("/classes/:id", ClassesController.deleteOne);
routes.post("/classes", ClassesController.create);
routes.put("/classes", ClassesController.update);
routes.post("/classes/comments", CommentsController.create);
routes.delete("classes/comments/:id", CommentsController.delete);
routes.delete("classes/comments/deleteone", CommentsController.deleteOne);
routes.get("/classes/comments", CommentsController.list);
routes.post("/login", AuthController.auth);
export default routes;
