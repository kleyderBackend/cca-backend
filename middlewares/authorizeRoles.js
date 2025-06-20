export const authorizeRoles = (...rolesPermitidos) => {
    return (req, res, next) => {
        const userRol = req.user.rol; // viene del JWT
        if (!rolesPermitidos.includes(userRol)) {
            return res.status(403).json({ message: 'Acceso denegado' });
        }
        next();
    };
};
