import Usuario from "./usuario.model.js";


export const actualizarUsuario = async (req, res) => {
    try{
        const { uid } = req.params;
        const data = req.body;
        const userToken = req.usuario.id;

        if (userToken !== uid) {
            return res.status(403).json({
                success: false,
                msg: 'No tienes permiso para modificar este usuario'
            });
        }

        const usuario = await Usuario.findByIdAndUpdate(uid, data, { new: true });

        if(!usuario){
            return res.status(404).json({
                success: false,
                msg: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            msg: 'Usuario Actualizado',
            usuario
        });


    }catch(err){
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar usuario',
            error: err.message
        });
    }
};


export const eliminarUsuario = async (req, res) => {
    try {
        
        const userToken = req.usuario._id;
        
        const usuarioEliminado = await Usuario.findById(userToken);

        if (!usuarioEliminado) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }
        await Usuario.findByIdAndDelete(userToken);

        res.status(200).json({
            success: true,
            message: 'Cuenta de usuario eliminada exitosamente'
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la cuenta de usuario',
            error: err.message
        });
    }
};

