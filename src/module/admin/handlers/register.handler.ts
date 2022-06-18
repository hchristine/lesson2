import { Request, Response } from "express";
import { RouteHandler } from "../../../core/handler";
import { Admin } from "../admin.model";
import { sendToken } from "../utils";

interface Body {
  email: string;
  password: string;
  name: string;
}

export class RegisterHandler implements RouteHandler<{}, Body> {
  async handle(req: Request<{}, any, Body>, res: Response) {
    const { email, password, name } = req.body;
    const adminExists = await Admin.findOne({ email, name });

    if (adminExists) {
        return res.status(401).send({ message: "Admin already exists!!!" })
    }
    Admin.register({
        email,
        password,
        name
    }).then(async (doc) => {
        sendToken(res, { email, name, adminId: String(doc._id) })
    })
        .catch((error) => {
            res.status(400).send(error);
        });
  }
}
