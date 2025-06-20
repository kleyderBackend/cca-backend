import { Router } from "express";
import { login } from "../controllers/usuario.controller.js";
import { register } from "../controllers/register.controller.js";
const router = Router();

router.post('/login', login);
router.post('/register', register);
export default router;