import ClassesController from "../controllers/ClassesController";
export class ClassesRoutes {
    router(app) {
        app.route("/classes").get(ClassesController.list);
        app.route("/classes/:id").get(ClassesController.selectOne);
        app.route("/classes/:id").delete(ClassesController.deleteOne);
        app.route("/classes").post(ClassesController.create);
        app.route("/classes").put(ClassesController.update);
    }
}
