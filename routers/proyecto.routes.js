import { Router } from "express";
import {
    createProject, getAllProjects,
    getOneProject, updateProject, deleteProject
} from '../controllers/proyectos.controller.js';

const router = Router();

router.get('/', getAllProjects);
router.get('/:id', getOneProject);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;