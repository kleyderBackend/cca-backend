import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    type: {
        type:
            String,
        enum: ['empresa', 'persona natural'],
        required: true,
    },
    history: {
        type: Boolean, default: false}
})

const Client = mongoose.model('Client', clientSchema);
export default Client;