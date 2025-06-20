import Pago from "../models/model.pagos.js";
import mongoose from "mongoose";

export const createPago = async (req, res) => {
    try {
        const { proyectoID, monto, tipo, fechaPago, detalle, comprobanteUrl } = req.body
        if (!proyectoID || !monto || !tipo || !fechaPago) {
            return res.status(400).json({
                status: 'fail',
                message: 'los campos no pueden estar vacion'
            })
        }
        const nuevoPago = await Pago.create({ proyectoID, monto, tipo, fechaPago, detalle, comprobanteUrl });
        return res.status(201).json({
            status: 'success',
            message: 'Pago registrado exitosamente',
            data: { pago: nuevoPago }
        });
    } catch (error) {
        console.error("Error al registrar el pago:", error);
        res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor',
            error: error.message
        });
    }
}

export const getAllPago = async (req, res) => {
    try {
        const pago = await Pago.find();
        return res.status(200).json({
            status: 'success',
            message: 'lista de pagos obtenida con correctamente',
            result: pago.length,
            data: { pago }
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

export const getOnePago = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({
                status: 'fail',
                message: 'campo invalido'
            })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }
        const pago = await Pago.findById(id);
        if (!pago) {
            return res.status(404).json({
                status: 'fail',
                message: 'pago no encontrado por ese ID'
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'pago encontrado con exito',
            data: { project }
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

export const updatePago = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: 'fail',
                message: 'pago no encontado por ese ID'
            })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }
        const pago = await Pago.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })

        if (!pago) {
            return res.status(404).json({
                status: 'fail',
                message: 'pago no exite'
            })
        }
        return res.status(200).json({
            status: 'success',
            data: { pago }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

export const deletePago = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }
        const pago = await Pago.findByIdAndDelete(id);
        if (!pago) {
            return res.status(404).json({
                status: 'fail',
                message: 'el pago que desea eliminar no exite'
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'pago eliminado con exito',
            data: null
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'error el servidor '
        })
    }
}