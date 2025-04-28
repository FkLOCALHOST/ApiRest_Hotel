import Usuario from "../usuario/usuario.model.js"

export const correoExists = async (correo = "") => {
    const existe = await Usuario.findOne({correo})
    if(existe){
        throw new Error(`The email ${correo} is already registered`)
    }
}

export const usuarioExists = async (nombreUsuario = "") => {
    const existe = await Usuario.findOne({nombreUsuario})
    if(existe){
        throw new Error(`The username ${nombreUsuario} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await Usuario.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}