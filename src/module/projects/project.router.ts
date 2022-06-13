import { Router } from "express";
import { createProject, deleteProject, getById, getProjects } from "./project.handlers";

export const router = Router();

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getById);
router.delete('/:id', deleteProject);