import { Router } from "express";
import { createPago, getAllPago, getOnePago, updatePago, deletePago } from '../controllers/pagos.controller.js';

const router = Router();
router.post('/', createPago);
router.get('/', getAllPago);
router.get('/:id', getOnePago);
router.put('/:id', updatePago);
router.delete('/:id', deletePago);

export default router;

