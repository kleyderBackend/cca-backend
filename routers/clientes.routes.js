import { Router } from "express";
import { CreateCLient, getAllClients, getOneClient, updateClient, deleteClient } from '../controllers/cliente.controller.js'
const router = Router();
router.post("/", CreateCLient);            // Crear cliente
router.get("/", getAllClients);            // Obtener todos
router.get("/:id", getOneClient);          // Obtener uno
router.put("/:id", updateClient);          // Actualizar
router.delete("/:id", deleteClient);       // Eliminar

export default router;