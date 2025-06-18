import mongoose from "mongoose";


const employeSchemas = mongoose.Schema({
    name: { type: String, required: true },
    post: {
        type: String,
        enum: ['ingeniero', 'obrero', 'maestro de obras'],
        required: true
    },
    salary: { type: Number },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    proyectAsing: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
})

const Employees = mongoose.model('Employees', employeSchemas);
export default Employees;