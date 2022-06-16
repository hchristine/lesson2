import { Router } from "express";
import { isAuthorized } from "../../middlewares/isAuthorized";
import { createProject, deleteProject, getById, getProjects } from "./project.handlers";

export const router = Router();

router.post('/', isAuthorized, createProject);
router.get('/', isAuthorized, getProjects);
router.get('/:id', getById);
router.delete('/:id', isAuthorized, deleteProject);