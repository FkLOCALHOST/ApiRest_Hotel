import Hotel from './hotel.model.js';

export const createHotel = async (req, res) => {
    try{
        const data = req.body;
        let hoteltPicture = req.file ? req.file.filename : null;
        data.hotelPicture = hoteltPicture;

        const hotel = await Hotel.create(data);
        return res.status(201).json({
            success: true,
            msg: 'Hotel created successfully',
            data: hotel,
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            msg: 'Error creating hotel',
            error: err.message,
        });
    }
}

export const getAllHotels = async (req, res) => {
    try{
        const hotels = await Hotel.find({status:true});
        return res.status(200).json({
            success: true,
            total: hotels.length,
            data: hotels,
            message: hotels.length === 0 ? 'No se encontraron hoteles activos' : undefined
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los hoteles',
            error: err.message,
        });
    }
}