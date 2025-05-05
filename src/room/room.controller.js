import Room from "./room.model.js";

export const createRoom = async (req, res) => {
    try {
        const data = req.body;
        data.createdBy = req.usuario._id;
        // Procesar imágenes subidas
        if (req.files && req.files.length > 0) {
            data.images = req.files.map(file => file.filename);
        } else {
            data.images = [];
        }
        const room = await Room.create(data);
        return res.status(201).json({
            success: true,
            message: "Habitación creada correctamente",
            data: room
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al crear la habitación",
            error: err.message
        });
    }
};

export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ status: "Disponible" });
        return res.status(200).json({
            success: true,
            total: rooms.length,
            data: rooms,
            message: rooms.length === 0 ? "No se encontraron habitaciones disponibles" : undefined
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las habitaciones",
            error: err.message
        });
    }
};

