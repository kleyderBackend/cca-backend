import Project from '../models/model.GProyectos.js';
import Client from '../models/models.cliente.js';
import Employees from '../models/models.empleados.js';
import mongoose from 'mongoose';

export const createProject = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'No se recibió ningún dato para actualizar'
            });
        }
        const { name, adress, dataStart, dateFinish, budget, status, encargadoID, clientID, materiales } = req.body;
        // Validación de campos requeridos
        if (!name || !adress || !dataStart || !dateFinish || !budget || !status || !encargadoID || !clientID || !materiales) {
            return res.status(400).json({
                status: 'fail',
                message: 'Todos los campos son obligatorios'
            });
        }
        if (!mongoose.Types.ObjectId.isValid(encargadoID)) {
            return res.status(400).json({ message: "ID de empleado inválido" });
        }

        // Validar que el empleado exista
        const empleado = await Employees.findById(encargadoID);
        if (!empleado) {
            return res.status(404).json({
                status: 'fail',
                message: 'Empleado encargado del proyecto no encontrado'
            });
        }

        // Validar que el cliente exista
        const cliente = await Client.findById(clientID);
        if (!cliente) {
            return res.status(404).json({
                status: 'fail',
                message: 'Cliente del proyecto no encontrado'
            });
        }

        // Crear el nuevo proyecto
        const newProject = {
            name,
            adress,
            dataStart,
            dateFinish,
            budget,
            status,
            encargadoID,
            clientID,
            materiales,
        };

        const project = await Project.create(newProject);

        return res.status(201).json({
            status: 'success',
            message: 'Proyecto creado con éxito',
            data: { project }
        });

    } catch (error) {
        console.error('Error al crear proyecto:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor al crear el proyecto',
            error: error.message
        });
    }
};

export const getAllProjects = async (req, res) => {
    try {
        const project = await Project.find();
        return res.status(200).json({
            status: 'success',
            message: 'lista de proyectos obtenida con correctamente',
            result: project.length,
            data: { project }
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

export const getOneProject = async (req, res) => {
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
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({
                status: 'fail',
                message: 'proyecto no encontrado por ese ID'
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'proyecto encontrado con exito',
            data: { project }
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: 'fail',
                message: 'proyecto no encontado por ese ID'
            })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }
        const project = await Project.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })

        if (!project) {
            return res.status(404).json({
                status: 'fail',
                message: 'proyecto no exite'
            })
        }
        return res.status(200).json({
            status: 'success',
            data: { project }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({
                status: 'fail',
                message: 'el proyecto que desea eliminar no exite'
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'proyecto eliminado con exito',
            data: null
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'error el servidor '
        })
    }
}