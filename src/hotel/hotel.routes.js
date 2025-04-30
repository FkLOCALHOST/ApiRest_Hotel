import { createHotel } from "./hotel.controller.js";
import { Router } from "express";
import { uploadHotelPicture } from "../middlewares/multer-uploads.js";
import { createHotelValidator } from "../middlewares/hotel-validators.js";
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

export default router;