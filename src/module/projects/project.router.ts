import { Router } from "express";
import { isAuthorized } from "../../middlewares/isAuthorized";
import { createProject, deleteProject, getById, getProjects } from "./project.handlers";

export const router = Router();
router.use(isAuthorized);

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getById);
router.delete('/:id', deleteProject);