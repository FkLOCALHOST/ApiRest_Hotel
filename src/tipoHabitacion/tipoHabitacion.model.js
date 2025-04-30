import { Schema, model } from "mongoose";

const tipoHabitacionSchema = Schema({
    nombreTipoHabitacion: {
        type: String,
        required: [true, "Se necesita el nombre del tipo de habitacion"],
        maxlength: [50, "El nombre del tipo de habitacion no puede ser mayor a 50 caracteres"]
    },
    descripcionTipoHabitacion: {
        type: String,
        required: [true, "Se necesita la descripcion del tipo de habitacion"],
        maxlength: [200, "La descripcion del tipo de habitacion no puede ser mayor a 200 caracteres"]
    }
},
{
    timestamps: true,
    versionKey: false
})

 /*tipoHabitacionSchema.methods.toJSON = function () {
    const { __v, _id, ...tipoHabitacion } = this.toObject();
    tipoHabitacion.uid = _id;
    return tipoHabitacion;
} 
*/

export default model('TipoHabitacion', tipoHabitacionSchema);