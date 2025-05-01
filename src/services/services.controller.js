import Services from "./services.model.js";



export const addService = async (req, res) => {
    try {
        const data = req.body;

        const service = new Services(data);

        await service.save();

        res.status(200).json({
            success: true,
            service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al agregar el servicio",
            error: error.message
        });
    }
};

export const getServices = async (req, res) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { status: true };

        const [total, services] = await Promise.all([
            Services.countDocuments(query),
            Services.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.status(200).json({
            success: true,
            total,
            services
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los servicios",
            error: err.message
        });
    }
};

export const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Services.findById(id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Servicio no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            service
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el servicio",
            error: err.message
        });
    }
};



export const updateService = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const service = await Services.findByIdAndUpdate(id, data, { new: true });

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Servicio no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el servicio',
            error: error.message
        });
    }
}
export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await Services.findByIdAndUpdate(id, { status: false }, { new: true });

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Servicio no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Servicio eliminado (desactivado)",
            service
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el servicio",
            error: err.message
        });
    }
};