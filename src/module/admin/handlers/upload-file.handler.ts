import { Request, Response } from "express";
import cloudinary from 'cloudinary';
import fs from 'fs';

import { RouteHandler } from "../../../core/handler";

interface Body {}

export class UploadFileHandler implements RouteHandler<{}, Body> {
  async handle(req: Request<{}, any, Body>, res: Response) {
    if (!req.file) {
      res.status(400).send();
      return;
    }
    cloudinary.v2.uploader
      .upload(req.file.path, (error, result) => {
        if (error) {
          res.status(400).send(error);
          return;
        }
        res.json({
          path: result!.url,
        });
      })
      .then(() => {
        fs.rm("uploads/", { recursive: true }, () => {
          console.log("deleted.");
        });
      });
  }
}
