import Client from '../models/models.cliente.js';

export const CreateCLient = async (req, res) => {
    try {
        const { name, email, phone, type, history } = req.body;
        if (!name || !email || !phone || !type) {
            return res.status(400).json({
                status: 'fail',
                message: "error: los campo no pueden estar vacio"
            })
        }
        if (isNaN(phone) || phone <= 0 || phone === "") {
            return res.status(400).json({
                status: 'fail',
                message: "error valor invalido ,el valor ingresado debe ser numerico"
            })
        }
        if (type !== 'persona natural' && type !== 'empresa') {
            return res.status(400).json({
                status: 'fail',
                message: "error los valor ingresado es invalido"
            })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: 'fail',
                message: "El correo ingresado no es válido"
            });
        }
        const existe = await Client.findOne({ email });
        if (existe) {
            return res.status(409).json({
                status: 'fail',
                message: "Ya existe un cliente con ese correo"
            });
        }


        const nuevoCLiente = {
            name,
            email,
            phone,
            type,
            history: history || false
        }

        const cliente = await Client.create(nuevoCLiente)
        return res.status(201).json({
            status: 'success',
            message: `${cliente.name} registrado con exito`,
            data: cliente
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

export const getAllClients = async (req, res) => {
    try {
        const clientes = await Client.find();
        return res.status(200).json({
            status: 'success',
            message: "Lista de clientes obtenida correctamente",
            result: clientes.length,
            data: {
                clientes
            }
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
        const cliente = await Client.findById(id);
        if (!cliente) {
            return res.status(404).json({
                status: 'fail',
                message: "cliente no encontrado por ese ID"
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'cliente encontrado con exito',
            data: { cliente }
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: 'fail',
                message: 'cliente no encontrado con ese id',
            })
        }
        const cliente = await Client.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })

        if (!cliente) {
            return res.status(404).json({
                status: 'fail',
                message: 'cliente no exite'
            })
        }
        return res.status(200).json({
            status: 'success',
            data: {
                cliente
            }
        });

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Client.findByIdAndDelete(id);
        if (!cliente) {
            return res.status(404).json({
                status: 'fail',
                mensaje: "no se encontro cliente con ese ID"
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