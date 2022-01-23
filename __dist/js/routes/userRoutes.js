import UserController from "../controllers/UserController";
class UserRoutes {
    router(app) {
        app.route("/users").get(UserController.list);
        app.route("/users").post(UserController.create);
    }
}
export default new UserRoutes();
