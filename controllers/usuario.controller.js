import jwt from 'jsonwebtoken';
import User from '../models/models.user.js';

export const login = async (req, res) => {
    const { email, password, rol } = req.body;

    // Validación básica
    if (!email || !password || !rol) {
        return res.status(400).json({
            status: 'fail',
            message: 'Todos los campos son obligatorios'
        });
    }

    try {
        // Buscar usuario incluyendo la contraseña (que normalmente está excluida)
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'Credenciales inválidas'
            });
        }

        // Comparar contraseñas
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                status: 'fail',
                message: 'Credenciales inválidas'
            });
        }

        // Verificar rol
        if (user.rol !== rol) {
            return res.status(403).json({
                status: 'fail',
                message: 'No tiene permisos para este rol'
            });
        }

        // Crear token JWT
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                rol: user.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: '8h' } // Token válido por 8 horas
        );

        // No devolver la contraseña
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            status: 'success',
            message: 'Inicio de sesión exitoso',
            token,
            user: userResponse
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor'
        });
    }
};