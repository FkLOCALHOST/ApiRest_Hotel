import { Router } from "express";
import { addRoomType, getRoomType, updateRoomType, deleteRoomType } from "./tipoHabitacion.controller.js";
import { addRoomTypeValidator, updateRoomTypeValidator, deleteRoomTypeValidator } from "../middlewares/tipoHabitacion-validators.js";   

const router = Router();

router.post("/addRoomType", addRoomTypeValidator, addRoomType);

router.get("/listRoomTypes", getRoomType);

router.put("/updateRoomType/:id", updateRoomTypeValidator, updateRoomType);  

router.delete("/deleteRoomType/:id", deleteRoomTypeValidator, deleteRoomType);

export default router;