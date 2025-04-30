import { Router } from "express";
import { actualizarUsuario, eliminarUsuario } from "./usuario.controller.js";
import { updateUserValidator, deleteUserValidator } from "../middlewares/usuario-validators.js";
 
const router = Router();

router.put("/actualizarUsuario/:uid", updateUserValidator, actualizarUsuario);

router.delete("/eliminarUsuario", deleteUserValidator, eliminarUsuario)

export default router;