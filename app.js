import express from "express";
import clientRoutes from "./routers/clientes.routes.js"; // ajusta el nombre si lo cambias
import empladosRouters from "./routers/empleado.routes.js";
import userRoutes from './routers/user.routes.js';
import register from './routers/registre.routes.js';
import proyectos from './routers/proyecto.routes.js';
import inventario from './routers/inventario.routes.js';
import pago from './routers/pago.routes.js';

import cors from "cors";

const app = express();
app.use(cors());


// 🧠 Middlewares
app.use(express.json());

// 🧪 Ruta de prueba
app.get("/", (req, res) => {
    res.send("Servidor activo");
});

// 🌐 Rutas principales
app.use("/api/client", clientRoutes);
app.use('/api/employees', empladosRouters);
app.use("/api/usuarios", userRoutes);
app.post('/register', register);
app.use('/api/proyectos', proyectos);
app.use('/api/inventario', inventario);
app.use('/api/pago', pago);
export default app;

