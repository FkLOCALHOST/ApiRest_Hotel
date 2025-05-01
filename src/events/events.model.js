import {Schema, model} from 'mongoose'

const eventSchema = new Schema({
    name:{
        type: String,
        required: true,
        maxLength:[70, 'El nombre no puede exceder los 70 caracteres' ]
    },
    cost:{
        type: Number,
        required: [true,'El costo es requerido'],
        default: 0.0
    },
    description:{
        type: String,
        required: [true, 'La descripcion es requerida'],
        maxLength:[200, 'La descripcion no puede exceder los 200 caracteres' ]
    },
    state:{
        type: String,
        enum: ['Reservado', 'Disponible', 'Ocupado'],
        default: 'Disponible'
    },
    image:{
        type: String
    },
    size:{
        type: String,
        required: true
    },
    services:{
        type: Schema.Types.ObjectId,
        ref: 'Services',
        required: true
    },
    roomType:{
        type: Schema.Types.ObjectId,
        ref: 'RoomType',
        required: true
    },
    date:{
        type: Date,
        required: true
    }

}, {
    timestamps: true,
    versionKey: false
})

eventSchema.methods.toJSON = function (){
    const {__v, _id, ...event} = this.toObject()
    event.eid = _id
    return event
}

export default model('Event', eventSchema)






