import { Request, Response } from 'express';
import { Admin } from './admin.model';
import { sendToken } from './utils';
import cloudinary from 'cloudinary';
import fs from 'fs';

export async function register(req: Request, res: Response) {
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

export async function login(req: Request, res: Response) {
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

export function uploadFile(req: Request, res: Response) {
    if (!req.file) {
        res.status(400).send();
        return;
    }
    cloudinary.v2.uploader.upload(req.file.path, (error, result) => {
        if (error) {
            res.status(400).send(error);
            return;
        }
        res.json({
            path: result!.url
        });
    })
        .then(() => {
            fs.rm('uploads/', { recursive: true }, () => {
                console.log("deleted.")
            });
        });
}