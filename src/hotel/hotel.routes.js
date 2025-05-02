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
import { validarCampos } from "../middlewares/validate-fields.js";
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";


const router = Router();

router.post(
    "/createHotel",
    uploadHotelPicture.single("hotelPicture"),
    createHotelValidator,
    deleteFileOnError,
    createHotel
);

router.get("/getAllHotels", getAllHotelsValidator, getAllHotels);

router.get("/getHotelsByName", getHotelsByNameValidator, getHotelsByName);

router.get("/getHotel/:id", getHotelByIdValidator, getHotelById);

router.put(
    "/updateHotel/:id",
    uploadHotelPicture.single("hotelPicture"),
    deleteFileOnError,
    updateHotelValidator,
    updateHotel
);

router.delete("/deleteHotel/:id", deleteHotelValidator, deleteHotel);


export default router;

