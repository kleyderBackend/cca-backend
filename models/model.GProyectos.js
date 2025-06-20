import mongoose from "mongoose";

const ProjectSchemas = mongoose.Schema({
    name: String,
    address: String,
    dataStart: Date,
    dateFinish: Date,
    budget: Number,
    status: { type: String, enum: ['en curso', 'finalizado', 'pendiente', 'activo'],required:true },
    encargadoID: { type: mongoose.Schema.Types.ObjectId, ref: 'Employees' },
    clientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    materiales: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Material',
        required: true
    }]
})

const Project = mongoose.model('Project', ProjectSchemas);
export default Project; 