import { Schema, model} from "mongoose";

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    surname:{
        type: String,
        required: [true, "Los apellidos son obligatorios"]
    },
    username:{
        type: String,
        required: [true, "El nombre de usuario es obligatorio"]
    },
    dpi: {
        type: String,
        required: [true, 'DPI is required'],
        minLength: 13,
        maxLength: 13
    },
    email:{
        type: String,
        required: [true, "El correo es obligatorio"]
    },
    password:{
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: [true, "El telefono es obligatorio"]
    },
    score: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 5
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "CLIENT_ROLE", "HOST_ROLE"],
        default: "CLIENT_ROLE"
    },
    profilePicture:{
        type: String
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})


userSchema.methods.toJSON = function(){
    const {_id, password, ...user} = this.toObject(); 
    user.id = _id
    return user
}

export default model("User", userSchema)