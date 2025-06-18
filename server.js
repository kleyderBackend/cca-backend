import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();
const PORT = process.env.PORT || 4000;

// 🔌 Conexión a MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB conectado correctamente");
    } catch (err) {
        console.error("❌ Error al conectar MongoDB:", err.message);
        process.exit(1);
    }
};

connectDB();

// 🚀 Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
