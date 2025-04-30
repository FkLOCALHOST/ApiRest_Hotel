import { Schema, model } from "mongoose";

const roomTypeSchema = Schema({
    roomTypeName: {
        type: String,
        required: [true, "The room type name is required"],
        maxlength: [50, "The room type name cannot exceed 50 characters"]
    },
    roomTypeDescription: {
        type: String,
        required: [true, "The room type description is required"],
        maxlength: [200, "The room type description cannot exceed 200 characters"]
    }
},
{
    timestamps: true,
    versionKey: false
})

/*roomTypeSchema.methods.toJSON = function () {
    const { __v, _id, ...roomType } = this.toObject();
    roomType.uid = _id;
    return roomType;
} 
*/

export default model('RoomType', roomTypeSchema);