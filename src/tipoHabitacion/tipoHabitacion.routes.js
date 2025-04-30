import { Router } from "express";
import { addTipoHabitacion, getTipoHabitacion, updateTipoHabitacion, deleteTipoHabitacion } from "./tipoHabitacion.controller.js";
import { addTipoHabitacionValidator, updateTipoHabitacionValidator, deleteTipoHabitacionValidator} from "../middlewares/tipoHabitacion-validators.js";   

const router = Router();

router.post("/agregarTipoHabitacion", addTipoHabitacionValidator, addTipoHabitacion);

router.get("/listarTipoHabitacion", getTipoHabitacion);

router.put("/actualizarTipoHabitacion/:id", updateTipoHabitacionValidator, updateTipoHabitacion);  

router.delete("/eliminarTipoHabitacion/:id", deleteTipoHabitacionValidator, deleteTipoHabitacion);

export default router;
