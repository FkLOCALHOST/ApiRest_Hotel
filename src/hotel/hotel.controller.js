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