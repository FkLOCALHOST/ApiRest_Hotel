import { Router } from "express";
import { addTipoHabitacion, getTipoHabitacion, updateTipoHabitacion } from "./tipoHabitacion.controller.js";
import { addTipoHabitacionValidator, updateTipoHabitacionValidator} from "../middlewares/tipoHabitacion-validators.js";   

const router = Router();

router.post("/agregarTipoHabitacion", addTipoHabitacionValidator, addTipoHabitacion);

router.get("/listarTipoHabitacion", getTipoHabitacion);

router.put("/actualizarTipoHabitacion/:id", updateTipoHabitacionValidator, updateTipoHabitacion);  




export default router;
