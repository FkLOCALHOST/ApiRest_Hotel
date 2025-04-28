import { Schema, model} from "mongoose";

const usuarioSchema = Schema({
    nombres:{
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    apellidos:{
        type: String,
        required: [true, "Los apellidos son obligatorios"]
    },
    nombreUsuario:{
        type: String,
        required: [true, "El nombre de usuario es obligatorio"],
        unique:true
    },
    correo:{
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },
    telefono:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: [true, "El telefono es obligatorio"],
        unique: true
    },
    rol:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "CLIENT_ROLE", "HOST_ROLE"],
        default: "CLIENT_ROLE"
    },
    fotoPerfil:{
        type: String
    },
    estado:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})


export default model("Usuario", usuarioSchema)