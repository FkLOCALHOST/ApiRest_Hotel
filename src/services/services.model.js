import { Schema, model } from 'mongoose';

const servicesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    Price:{
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    schedule: {
        type: String,
        required: true,
    },

    status: {
        type: Boolean,
        default: true,
    },
})

export default model('Services', servicesSchema);