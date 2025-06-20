import { Router } from "express";
import {
    creatEmployees,
    getAllEmployees,
    getOneEmployees,
    updateEmployees, deleteEmployees
} from '../controllers/empleado.controller.js';
const router = Router();

router.post('/', creatEmployees);
router.get('/', getAllEmployees);
router.get('/:id', getOneEmployees);
router.put('/:id', updateEmployees);
router.delete('/:id', deleteEmployees);

export default router;