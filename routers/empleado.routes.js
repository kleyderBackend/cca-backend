import { Router } from "express";
import {
    creatEmployees,
    getAllEmployees,
    getOneClient,
    updateEmployees, deleteEmployees
} from '../controllers/empleado.controller.js';
const router = Router();

router.post('/', creatEmployees);
router.get('/', getAllEmployees);
router.get('/:id', getOneClient);
router.put('/:id', updateEmployees);
router.delete('/:id', deleteEmployees);

export default router;