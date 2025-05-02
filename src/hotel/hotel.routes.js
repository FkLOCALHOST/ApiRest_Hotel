import { createHotel, getAllHotels, getHotelsByName} from "./hotel.controller.js";
import { Router } from "express";
import { uploadHotelPicture } from "../middlewares/multer-uploads.js";
import { createHotelValidator, getAllHotelsValidator, getHotelsByNameValidator } from "../middlewares/hotel-validators.js";
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


export default router;

