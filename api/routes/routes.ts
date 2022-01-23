import { Router } from "express";

/* All Routes are protected after this... */

import ClassesController from "../controllers/ClassesController";
import CommentsController from "../controllers/CommentsController";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import MiddlewareJWT from "../middlewares/jwt";

const routes = Router();
routes.get("/login", MiddlewareJWT.checkAuth);
routes.post("/login", AuthController.auth);
routes.get("/users", MiddlewareJWT.checkAuth, UserController.list);
routes.post("/users", MiddlewareJWT.checkAuth, UserController.create);

routes.get("/classes", MiddlewareJWT.checkAuth, ClassesController.list);
routes.get(
  "/classes/:id",
  MiddlewareJWT.checkAuth,
  ClassesController.selectOne
);
routes.delete(
  "/classes/:id",
  MiddlewareJWT.checkAuth,
  ClassesController.deleteOne
);
routes.post("/classes", MiddlewareJWT.checkAuth, ClassesController.create);
routes.put("/classes", MiddlewareJWT.checkAuth, ClassesController.update);

routes.post(
  "/classes/comments",
  MiddlewareJWT.checkAuth,
  CommentsController.create
);
routes.delete(
  "classes/comments/:id",
  MiddlewareJWT.checkAuth,
  CommentsController.delete
);
routes.delete(
  "classes/comments/deleteone",
  MiddlewareJWT.checkAuth,
  CommentsController.deleteOne
);
routes.get(
  "/classes/comments",
  MiddlewareJWT.checkAuth,
  CommentsController.list
);

export default routes;
