import express from "express";
import clientRoutes from "./routers/clientes.routes.js"; // ajusta el nombre si lo cambias

const app = express();

// 🧠 Middlewares
app.use(express.json());

// 🧪 Ruta de prueba
app.get("/", (req, res) => {
    res.send("Servidor activo");
});

// 🌐 Rutas principales
app.use("/api/client", clientRoutes);

export default app;
