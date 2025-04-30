import TipoHabitacion from "./tipoHabitacion.model.js";

export const addTipoHabitacion = async (req, res) => {
    try {
        const tipoHabitacion = new TipoHabitacion(req.body);
        const tipoHabitacionCreated = await tipoHabitacion.save();
        res.status(201).json(tipoHabitacionCreated);
    } catch (error) {
        res.status(500).json({
            error: "Error al agregar el tipo de habitacion",
            details: error.message 
        });
    }
}

export const getTipoHabitacion = async (req, res) => {
    try {
        const tipoHabitacion = await TipoHabitacion.find();
        res.status(200).json(tipoHabitacion);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener el tipo de habitacion",
            details: error.message 
        });
    }
}

export const updateTipoHabitacion = async (req, res) => {
    try {
        const tipoHabitacion = await TipoHabitacion.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(200).json(tipoHabitacion);
    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar el tipo de habitacion",
            details: error.message });
    }
}
