import User from '../models/models.user.js';

export const register = async (req, res) => {
    try {
        const { name, email, password, rol } = req.body;

        // Crear usuario (el middleware se encargará del hasheo)
        const user = new User({ name, email, password, rol });
        await user.save();

        // No devolver la contraseña (ni siquiera hasheada)
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            status: 'success',
            message: 'Usuario creado con éxito',
            user: userResponse
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                status: 'fail',
                message: 'El correo electrónico ya está registrado'
            });
        }
        res.status(500).json({
            status: 'error',
            message: 'Error al crear usuario',
            error: err.message
        });
    }
};