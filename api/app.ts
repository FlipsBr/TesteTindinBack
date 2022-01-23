import * as express from "express";
import * as cors from "cors";
import * as mongoose from "mongoose";
import routes from "./routes/routes";
import * as bodyParser from "body-parser";

//const mongoose = require("mongoose");

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(bodyParser.urlencoded({ extended: false })); //para forms
    this.express.use(express.json());
    this.express.use(cors());
  }

  private database(): void {
    mongoose.connect(
      "mongodb://admin:123456@localhost:27017/Tindin?authSource=admin"
    );
  }

  private routes(): void {
    this.express.use(routes);
  }
}
export default new App();
