import Employees from '../models/models.empleados.js';

export const creatEmployees = async (req, res) => {
    try {
        const { name, post, salary, email, phone, proyectAsing } = req.body;
        if (!name || !post || !salary || !email || !phone) {
            return res.status(400).json({
                status: 'fail',
                message: 'error campos no pueden estar vacios'
            })
        }
        if (isNaN(salary) || salary <= 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'error lo campos deben ser numericos mayores a cero'
            })
        }

        if (isNaN(phone)) {
            return res.status(400).json({
                status: 'fail',
                message: 'error lo campos deben ser numericos mayores a cero'
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: 'fail',
                message: "El correo ingresado no es válido"
            });
        }

        const existe = await Employees.findOne({ email });
        if (existe) {
            return res.status(409).json({
                status: 'fail',
                message: "Ya existe un empleado con ese correo"
            });
        }
        if (!['ingeniero', 'maestro de obra', 'obrero'].includes(post)) {
            return res.status(400).json({
                status: 'fail',
                message: 'opcion invalida'
            })
        }
        const nuevoEmpleado = {
            name,
            post,
            salary,
            email,
            phone,
            proyectAsing
        }

        const empleado = await Employees.create(nuevoEmpleado);
        res.status(201).json({
            status: 'success',
            message: `${empleado.name} usuario creado con exito:`,
            data: { empleado }
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

export const getAllEmployees = async (req, res) => {
    try {
        const emplados = await Employees.find();
        return res.status(200).json({
            status: 'success',
            message: 'lista de empleados obtenida correctamente',
            result: emplados.length,
            data: { clientes }
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

export const getOneClient = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: 'fail',
                message: 'el campo es invalido'
            })
        }
        const empleado = await Employees.findById(id);
        if (!empleado) {
            return res.status(404).json({
                status: 'fail',
                message: 'empleado no encontrado con ese ID'
            })
        }
        return res.status(200).json({
            status: 'success',
            message: 'empleado encontrado con exito',
            data: { empleado }
        })
    } catch (error) {

    }
}

export const updateEmployees = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: 'fail',
                message: 'empleado no encontrado con ese id',
            })
        }
        const empleado = await Employees.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })

        if (!empleado) {
            return res.status(404).json({
                status: 'fail',
                message: 'empleado no exite'
            })
        }
        return res.status(200).json({
            status: 'success',
            data: {
                empleado
            }
        });

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

export const deleteEmployees = async (req, res) => {
    try {
        const { id } = req.params;
        const empleado = await Employees.findByIdAndDelete(id);
        if (!empleado) {
            return res.status(404).json({
                status: 'fail',
                mensaje: "no se encontro empleado con ese ID"
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}