import Event from "./events.model.js"

export const createEvent = async (req, res) =>{
    try{
        const data = req.body
        let image = req.file ? req.file.filename : null;
        data.image = image

        const event = await Event.create(data)
        return res.status(201).json({
            success: true,
            message: "Evento creado correctamente",
            data: event
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al crear el evento",
            error: err.message
        })
    }
}

export const getEvents = async (req, res) =>{
    try{
        const events = await Event.find()
        .populate('services', 'name')
        .populate('hotel', 'name')
        .exec()

        return res.status(200).json({
            success: true,
            message: "Eventos obtenidos correctamente",
            data: events
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los eventos",
            error: err.message 
        })
    }
}


export const updateEvent = async (req, res) =>{
    try{
        const {eid} = req.params
        const data = req.body
        let image = req.file ? req.file.filename : null;
        data.image = image

        const event = await Event.findByIdAndUpdate(eid, data, {new: true})
        if(!event){
            return res.status(404).json({
                success: false,
                message: "Evento no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Evento actualizado correctamente",
            data: event
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el evento",
            error: err.message
        })
    }
}

export const deleteEvent = async (req, res) =>{
    try{
        const {eid} = req.params

        const event = await Event.findByIdAndDelete(eid)
        if(!event){
            return res.status(404).json({
                success: false,
                message: "Evento no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Evento eliminado correctamente",
            data: event
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el evento",
            error: err.message
        })
    }
}

export const searchEvent = async (req, res) =>{
    try{
        const {name} = req.params

        const event = await Event.findOne({name})
        if(!event){
            return res.status(404).json({
                success: false,
                message: "Evento no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Evento encontrado",
            data: event
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al buscar el evento",
            error: err.message
        })
    }
}






