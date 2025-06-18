import mongoose from "mongoose";

const ProjectSchemas = mongoose.Schema({
    name: String,
    address: String,
    dataStart: Date,
    dateFinish: Date,
    budget: Number,
    status: { type: String, enum: ['pendiente', 'en ejecución', 'finalizado', 'pausado'] },
    encargadoID: { type: mongoose.Schema.Types.ObjectId, ref: 'Employees' },
    clientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    materiales: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InventarioMaterial' }]
})

const Project=mongoose.model('Project',ProjectSchemas);
export default Project;