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
    image: {
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
        enum: ['Motel', 'Resort', 'Boutifque', 'Casa', 'Familiar', 'Temático', 'Económico'],
        required: true,
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    
},
{
    versionKey: false,
    timeStamps: true

})

export default model('Hotel', hotelSchema);

