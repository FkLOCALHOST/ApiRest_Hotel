import { Schema, model } from "mongoose";

const roomSchema = new Schema({
    number: {
        type: String,
        required: true
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: "Hotel",
        required: true
    },
    roomType: {
        type: Schema.Types.ObjectId,
        ref: "RoomType",
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    capacity: {
        type: Number,
        required: true,
        min: 1
    },
    beds: {
        type: Number,
        required: true,
        min: 1
    },
    bathrooms: {
        type: Number,
        required: true,
        min: 1
    },
    size: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Disponible", "Ocupada", "Mantenimiento", "Reservada", "Eliminada"],
        default: "Disponible"
    },
    description: {
        type: String,
        maxlength: 300
    },
    images: [{
        type: String
    }],
    amenities: [{
        type: String
    }],
}, {
    timestamps: true,
    versionKey: false
});

export default model("Room", roomSchema);