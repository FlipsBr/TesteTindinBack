import AuthController from "../controllers/AuthController";
import MiddlewareJwt from "../middlewares/jwt";
export class authRoutes {
    router(app) {
        app.route("/login").get(MiddlewareJwt.checkAuth);
        app.route("/login").post(AuthController.auth);
    }
}
