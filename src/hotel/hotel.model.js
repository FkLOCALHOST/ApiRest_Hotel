import {Schema, model} from 'mongoose';

const hotelSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        country: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String, required: true },
    },
    hotelPicture: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    type: {
        type: String,
        enum: ['Motel', 'Resort', 'Boutique', 'Casa', 'Familiar', 'Temático', 'Económico'],
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    host: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    checkInTime: {
        type: String,   
        required: true,
        default: "15:00",
        validate: {
          validator: (v) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v),
          message: "Formato de hora inválido (use HH:MM, ej: 15:00)",
        },
      },
      checkOutTime: {
        type: String,
        required: true,
        default: "12:00",
        validate: {
          validator: (v) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v),
          message: "Formato de hora inválido (use HH:MM, ej: 12:00)",
        },
      },
    
}, {
    versionKey: false,
    timestamps: true

})

export default model('Hotel', hotelSchema);

