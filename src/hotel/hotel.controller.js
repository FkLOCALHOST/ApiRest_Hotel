import Hotel from './hotel.model.js';
import fs from 'fs';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

export const createHotel = async (req, res) => {
    try {
        const data = req.body;
        let hotelPicture = req.file ? req.file.filename : null;
        data.hotelPicture = hotelPicture;

        const { _id: userId } = req.usuario;
        data.host = userId; 

        const hotel = await Hotel.create(data);
        return res.status(201).json({
            success: true,
            msg: 'Hotel created successfully',
            data: hotel,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Error creating hotel',
            error: err.message,
        });
    }
};

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

export const getHotelsByName = async (req, res) => {
    try{
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Name is required to search hotels',
            });
        }
        const hotels = await Hotel.find({status:true, name: {$regex: name, $options: 'i'}});
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

export const getHotelById = async (req, res) => {
    try{
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID is required to search hotels',
            });
        }
        const hotel = await Hotel.findById(id);
        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: 'Hotel not found',
            });
        }
        return res.status(200).json({
            success: true,
            data: hotel,
            message: hotel.length === 0 ? 'No se encontraron hoteles activos' : undefined
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al obtener el hotel',
            error: err.message,
        });
    }
}

export const updateHotel = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID is required to update hotels',
            });
        }
        const data = req.body;
        const userId = req.usuario._id;
        const hotel = await Hotel.findById(id);
        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: 'Hotel not found',
            });
        }
        if (hotel.host.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para editar este hotel',
            });
        }
        if (req.file) {
            const oldPath = join(CURRENT_DIR, '../../public/uploads/hotel-pictures', hotel.hotelPicture);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
            data.hotelPicture = req.file.filename;
        }
        const updatedHotel = await Hotel.findByIdAndUpdate(id, data, { new: true });
        return res.status(200).json({
            success: true,
            msg: 'Hotel actualizado correctamente',
            data: updatedHotel,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar el hotel',
            error: err.message,
        });
    }
};

export const deleteHotel = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID is required to delete hotel',
            });
        }
        const userId = req.usuario._id;
        const hotel = await Hotel.findById(id);
        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: 'Hotel not found',
            });
        }
        if (hotel.host.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para eliminar este hotel',
            });
        }
        const deletedHotel = await Hotel.findByIdAndUpdate(id, { status: false }, { new: true });
        return res.status(200).json({
            success: true,
            msg: 'Hotel eliminado correctamente',
            data: deletedHotel,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar el hotel',
            error: err.message,
        });
    }
};


