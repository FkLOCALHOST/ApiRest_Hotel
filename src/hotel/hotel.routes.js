import { createHotel, getAllHotels, getHotelsByName, getHotelById, updateHotel, deleteHotel } from "./hotel.controller.js";
import { Router } from "express";
import { uploadHotelPicture } from "../middlewares/multer-uploads.js";
import { 
    createHotelValidator, 
    getAllHotelsValidator, 
    getHotelsByNameValidator,
    getHotelByIdValidator,
    updateHotelValidator,
    deleteHotelValidator
} from "../middlewares/hotel-validators.js";

import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";


const router = Router();

router.post(
    "/createHotel",
    createHotelValidator,
    uploadHotelPicture.single("hotelPicture"),
    deleteFileOnError,
    createHotel
);

router.get("/getAllHotels", getAllHotelsValidator, getAllHotels);

router.get("/getHotelsByName", getHotelsByNameValidator, getHotelsByName);

router.get("/getHotel/:id", getHotelByIdValidator, getHotelById);

router.put(
    "/updateHotel/:id",
    updateHotelValidator,
    uploadHotelPicture.single("hotelPicture"),
    deleteFileOnError,
    updateHotel
);

router.delete("/deleteHotel/:id", deleteHotelValidator, deleteHotel);


export default router;

