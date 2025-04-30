import { body, param } from 'express-validator';
import { handleErrors } from './handle-errors.js';
import { tipoHabitacionExists } from "../helpers/db-validators.js";
import { validarCampos } from './validate-fields.js';
import { validateJWT } from './validate-jwt.js';
import { hasRoles } from './validate-roles.js';

export const addTipoHabitacionValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE","HOST_ROLE"),
    body("nombreTipoHabitacion").notEmpty().withMessage("El nombre del tipo de habitación es requerido"),
    body("descripcionTipoHabitacion").notEmpty().withMessage("La descripción del tipo de habitación es requerida"),
    validarCampos,
    handleErrors
    
];

export const updateTipoHabitacionValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE","HOST_ROLE"),
    param("id").isMongoId().withMessage("El id no es un id de mongo").custom(tipoHabitacionExists).withMessage("El tipo de habitación no existe"),
    param("id").custom(tipoHabitacionExists),
    validarCampos,
    handleErrors
];

export const deleteTipoHabitacionValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE","HOST_ROLE"),
    param("id").isMongoId().withMessage("El id no es un id de mongo").custom(tipoHabitacionExists).withMessage("El tipo de habitación no existe"),
    param("id").custom(tipoHabitacionExists),
    validarCampos,
    handleErrors
];
