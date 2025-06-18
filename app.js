import express from "express";
import clientRoutes from "./routers/clientes.routes.js"; // ajusta el nombre si lo cambias
import empladosRouters from "./routers/empleado.routes.js";

const app = express();

// 🧠 Middlewares
app.use(express.json());

// 🧪 Ruta de prueba
app.get("/", (req, res) => {
    res.send("Servidor activo");
});

// 🌐 Rutas principales
app.use("/api/client", clientRoutes);
app.use('/api/employees', empladosRouters);
export default app;
