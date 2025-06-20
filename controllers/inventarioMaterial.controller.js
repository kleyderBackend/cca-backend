import InventarioMaterial from "../models/models.inventario.js";
import mongoose from "mongoose";

export const createMaterial = async (req, res) => {
    try {
        const { name, quantity, costPerUnit, location, asignaciones } = req.body
        if (!name || !quantity || !costPerUnit || !location) {
            return res.status(400).json({
                status: 'fail',
                message: 'Los campos name, quantity, costPerUnit y location son obligatorios'
            });
        }

        if (typeof quantity !== 'number' || quantity <= 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'la cantidad del material debe ser mayor a cero'
            })
        }
        if (costPerUnit <= 0 || isNaN(costPerUnit)) {
            return res.status(400).json({
                status: 'fail',
                message: 'El costo por unidad debe ser mayor a cero'
            })
        }
        if (asignaciones && !Array.isArray(asignaciones)) {
            return res.status(400).json({
                status: 'fail',
                message: 'El campo asignaciones debe ser un array si se proporciona'
            });
        }


        const nuevoMaterial = await InventarioMaterial.create({
            name,
            quantity,
            costPerUnit,
            location,
            asignaciones
        })

        return res.status(201).json({
            status: 'success',
            message: 'Material creado con éxito',
            data: { material: nuevoMaterial }
        });

    } catch (error) {
        console.error("Error al crear material:", error);
        res.status(500).json({
            status: 'error',
            message: 'El servidor ha fallado',
            error: error.message
        })
    }
}

export const getAllMaterial = async (req, res) => {
    try {
        const material = await InventarioMaterial.find();
        return res.status(200).json({
            status: 'success',
            message: 'lista de material obtenida con correctamente',
            result: material.length,
            data: { material }
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

export const getOneMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({
                status: 'fail',
                message: 'no se encontro material por ese id'
            })
        }
        const material = await InventarioMaterial.findById(id);
        if (!material) {
            return res.status(404).json({
                status: 'fail',
                message: 'no exite material por ese ID'
            })
        }
        return res.status(200).json({
            status: 'success',
            message: 'material encontrado con exito',
            data: { material }
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

export const updateMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: 'fail',
                message: 'material no encontado por ese ID'
            })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }
        const material = await InventarioMaterial.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })

        if (!material) {
            return res.status(404).json({
                status: 'fail',
                message: 'El material no existe con ese ID'
            })
        }
        return res.status(200).json({
            status: 'success',
            data: { material }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

export const deleteMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }
        const material = await InventarioMaterial.findByIdAndDelete(id);
        if (!material) {
            return res.status(404).json({
                status: 'fail',
                message: 'el material que desea eliminar no exite'
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'material eliminado con exito',
            data: null
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'error el servidor'
        })
    }
}