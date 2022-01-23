import * as express from "express";
import * as cors from "cors";
import * as mongoose from "mongoose";
import routes from "./routes/routes";
import * as bodyParser from "body-parser";
//const mongoose = require("mongoose");
class App {
    constructor() {
        this.express = express();
        this.middlewares();
        this.database();
        this.routes();
    }
    middlewares() {
        this.express.use(bodyParser.urlencoded({ extended: false })); //para forms
        this.express.use(express.json());
        this.express.use(cors());
    }
    database() {
        mongoose.connect("mongodb://admin:123456@localhost:27017/Tindin?authSource=admin");
    }
    routes() {
        this.express.use(routes);
    }
}
export default new App();
