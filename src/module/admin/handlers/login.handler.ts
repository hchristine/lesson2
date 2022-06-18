import { Request, Response } from "express";
import { RouteHandler } from "../../../core/handler";
import { Admin } from "../admin.model";
import { sendToken } from "../utils";

interface Body {
  email: string;
  password: string;
}

export class LoginHandler implements RouteHandler<{}, Body> {
  async handle(req: Request<{}, any, Body>, res: Response) {
    const { email, password } = req.body;
    try {
        const admin = await Admin.login({ email, password });
        sendToken(res, {
            adminId: admin._id,
            email: admin.email,
            name: admin.name
        });
    }
    catch (e) {
        res.status(404).send(e)
    }
  }
}
