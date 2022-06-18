import express from "express";

import { connect } from "./database/db";
import App from "./lib/app";

import { router as adminRouter } from "./module/admin/admin.router";
import { router as projectRouter } from "./module/projects/project.router";

const app = new App();

const port = process.env.PORT || "3000";

app.registerMiddleware(express.json());
app.registerMiddleware(express.static("public"));
app.registerRouter(adminRouter);
app.registerRouter(projectRouter);

export function start() {
  connect()
    .then(() => {
      return app.start(port);
    })
    .then(() => {
      console.log("Listening on port 3000.");
    });
}
