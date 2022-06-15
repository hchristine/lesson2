import { Request, Response } from 'express';
import { Project } from './project.model';
import qrcode from 'qrcode';
import cloudinary from 'cloudinary';

export async function createProject(req: Request, res: Response) {
    const { photos, title } = req.body;

    const project = new Project({
        photos,
        title
    });
    try {
        const QRCode = await qrcode.toDataURL(`http://localhost:3000/${project._id}`);
        const cloudinaryImage = await cloudinary.v2.uploader.upload(QRCode);
        project.QR = cloudinaryImage.secure_url;
        await project.save();
        res.status(201).json(project);
    }
    catch (error) {
        res.status(404).send(error);
    }
}

export function getProjects(req: Request, res: Response) {
    Project
        .find()
        .then((project) => {
            res.json(project);
        })
        .catch(() => {
            res.status(404).send();
        })
}

export async function getById(req: Request, res: Response) {
    try {
        const project = await Project.findOne({ _id: req.params.id });
        res.json(project);
    }
    catch (error) {
        res.status(404).send();
    }
}

export async function deleteProject(req: Request, res: Response) {
    try {
        Project.deleteOne({ _id: req.params.id });
        await res.status(200).json("deleted");
    }
    catch (error) {
        res.status(404).send();
    }

}

