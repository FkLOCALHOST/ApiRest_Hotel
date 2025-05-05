import Router from "express";
import { createRoomValidator } from "../middlewares/room-validators.js";
import { createRoom } from "./room.controller.js";
import { uploadRoomPicture } from "../middlewares/multer-uploads.js";
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";
const router = Router();

router.post(
    "/createRoom",
    uploadRoomPicture.array("roomPictures", 5),
    createRoomValidator,
    deleteFileOnError,
    createRoom
);

export default router;