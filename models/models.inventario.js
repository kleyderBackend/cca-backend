import mongoose from "mongoose";

const inventarioSchema = mongoose.Schema({
    name: { type: String, required: true }, // Nombre del material
    quantity: { type: Number, required: true }, // Cantidad disponible
    costPerUnit: { type: Number, required: true }, // Costo por unidad
    location: { type: String, default: "Bodega principal" }, // Ubicación del inventario
    asignaciones: [
        {
            projectID: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
            cantidadUsada: { type: Number },
            fecha: { type: Date, default: Date.now }
        }
    ]
});

const InventarioMaterial = mongoose.model("InventarioMaterial", inventarioSchema);
export default InventarioMaterial;
