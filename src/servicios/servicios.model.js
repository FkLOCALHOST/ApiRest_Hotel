import { schema, model} from "mongoose";

const serviciosSchema = schema({
    nombreServicio:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [50, "Name cannot exceed 50 characters"]
    },

    descripcionServicio:{
        type: String,
        required: [true, "Descripcion is required"],
        maxLength: [100, "Descripcion cannot exceed 100 characters"]

    }
},
{
    versionKey: false,
    timeStamps: true
})

serviciosSchema.methods.toJson = function(){
    const {nombreServicio, descripcionServicio, ...servicios} = this.toObject()
    usuario.
}

/*
nombre
descripcion
precio
estado (disponible, no disponible, cancelado)
*/
