 jramirez-2023013
import Usuario from "../usuario/usuario.model.js"
import TipoHabitacion from "../roomType/roomType.model.js"

export const correoExists = async (correo = "") => {
    const existe = await Usuario.findOne({correo})
    if(existe){
        throw new Error(`The email ${correo} is already registered`)
    }
};

export const usuarioExists = async (nombreUsuario = "") => {
    const existe = await Usuario.findOne({nombreUsuario})
    if(existe){
        throw new Error(`The username ${nombreUsuario} is already registered`)
    }
};

export const userExists = async (uid = " ") => {
    const existe = await Usuario.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
};

export const tipoHabitacionExists = async (id = " ") => {
    const existe = await TipoHabitacion.findById(id);
    if (!existe) {
        throw new Error(`No existe el tipo de habitacion con el ID proporcionado`);
    }

};

 cescobar-2019272
import Usuario from "../user/user.model.js"
import Services from "../services/services.model.js"

import User from "../user/user.model.js"
 developer

export const emailExists = async (email = "") => {
    const existe = await User.findOne({ email, status: true });
    if (existe) {
        throw new Error(`The email ${email} is already registered`);
    }
};

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username, status: true})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const dpiExists = async (dpi = "") => {
    const existe = await User.findOne({dpi, status: true})
    if(existe){
        throw new Error(`The Dpi ${dpi} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
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
 developer
