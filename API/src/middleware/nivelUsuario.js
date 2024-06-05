export const verificarUsuario = (tipo) => {
    return (req, res, next) => {
        if (!req.userData || req.userData.nivel_usuario !== tipo) {
            return res.status(403).json({ message: 'Acesso não autorizado.' });
        }
        next();
    };
};
