import AppRouter from "../../lib/router";
import { isAuthorized } from "../../middlewares/isAuthorized";
import { createProject, deleteProject, getById, getProjects } from "./project.handlers";

export const router = new AppRouter('projects');

// router.getInstance().post('/', isAuthorized, createProject);
// router.getInstance().get('/', isAuthorized, getProjects);
// router.getInstance().get('/:id', getById);
// router.getInstance().delete('/:id', isAuthorized, deleteProject);