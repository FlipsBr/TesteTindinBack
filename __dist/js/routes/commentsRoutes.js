import CommentsController from "../controllers/CommentsController";
export class CommentsRoutes {
    router(app) {
        app.route("/classes/comments").post(CommentsController.create);
        app.route("classes/comments/:id").delete(CommentsController.delete);
        app
            .route("classes/comments/deleteone")
            .delete(CommentsController.deleteOne);
        app.route("/classes/comments").get(CommentsController.list);
    }
}
