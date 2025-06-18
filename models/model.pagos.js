import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema({
    proyectoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    monto: {
        type: Number,
        required: true,
        min: [1, "El monto debe ser mayor a 0"]
    },
    tipo: {
        type: String,
        enum: ["materiales", "mano de obra", "maquinaria", "servicios", "otros"],
        required: true
    },
    fechaPago: {
        type: Date,
        required: true
    },
    detalle: {
        type: String,
        default: ""
    },
    comprobanteUrl: {
        type: String, // URL de un archivo PDF o imagen si se carga
        default: null
    }
}, {
    timestamps: true
});

const Pago = mongoose.model("Pago", pagoSchema);
export default Pago;
