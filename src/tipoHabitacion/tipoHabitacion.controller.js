import RoomType from "./tipoHabitacion.model.js";

export const addRoomType = async (req, res) => {
    try {
        const roomType = new RoomType(req.body);
        const roomTypeCreated = await roomType.save();
        res.status(201).json(roomTypeCreated);
    } catch (error) {
        res.status(500).json({
            error: "Error al agregar el tipo de habitacion",
            details: error.message 
        });
    }
}

export const getRoomType = async (req, res) => {
    try {
        const roomType = await RoomType.find();
        res.status(200).json(roomType);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener el tipo de habitacion",
            details: error.message 
        });
    }
}

export const updateRoomType = async (req, res) => {
    try {
        const roomType = await RoomType.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(roomType);
    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar el tipo de habitacion",
            details: error.message 
        });
    }
}

export const deleteRoomType = async (req, res) => {
    try {
        const roomType = await RoomType.findByIdAndDelete(req.params.id);
        res.status(200).json(roomType);
    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar el tipo de habitacion",
            details: error.message 
        });
    }
}