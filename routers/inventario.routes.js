import { Router } from "express";
import
{createMaterial, getAllMaterial, getOneMaterial,
updateMaterial, deleteMaterial }from '../controllers/inventarioMaterial.controller.js';

const router = Router();
router.get('/', getAllMaterial);
router.post('/', createMaterial);
router.get('/:id', getOneMaterial);
router.put('/:id', updateMaterial);
router.delete('/:id', deleteMaterial);

export default router;