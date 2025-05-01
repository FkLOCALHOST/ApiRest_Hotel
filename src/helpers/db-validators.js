
import User from "../user/user.model.js"
import RoomType from "../roomType/roomType.model.js"
import Services from "../services/services.model.js"


export const roomTypeExists = async (id = " ") => {
    const existe = await RoomType.findById(id);
    if (!existe) {
        throw new Error(`No existe el tipo de habitacion con el ID proporcionado`);
    }

};
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

