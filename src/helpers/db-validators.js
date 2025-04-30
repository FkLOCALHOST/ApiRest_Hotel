import Usuario from "../user/user.model.js"
import Services from "../services/services.model.js"

export const emailExists = async (correo = "") => {
    const existe = await Usuario.findOne({correo})
    if(existe){
        throw new Error(`The email ${correo} is already registered`)
    }
}

export const usernameExists = async (nombreUsuario = "") => {
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

export const serviceExists = async (sid = " ") => {
    const existe = await Services.findById(sid)
    if(!existe){
        throw new Error("No existe el servicio con el ID proporcionado")
    }
}