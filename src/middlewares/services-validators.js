import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { serviceExists } from "../helpers/db-validators.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const validateAddService = [
    validateJWT,
    hasRoles("ADMIN_ROLE","HOST_ROLE"),
    body("name").notEmpty().withMessage("El nombre del servicio es requerido"),
    body("name").isLength({ max: 50 }).withMessage("El nombre no puede exceder los 50 caracteres"),
    body("Price").notEmpty().withMessage("El precio del servicio es requerido"),
    body("Price").isNumeric().withMessage("El precio debe ser un número válido"),
    body("description").notEmpty().withMessage("La descripción del servicio es requerida"),
    body("description").isLength({ max: 200 }).withMessage("La descripción no puede exceder los 200 caracteres"),
    body("schedule").notEmpty().withMessage("El horario del servicio es requerido"),
    body("schedule").isLength({ max: 100 }).withMessage("El horario no puede exceder los 100 caracteres"),
    validarCampos,
    deleteFileOnError,
    handleErrors
];

export const validateGetServiceById = [
    validateJWT,
    hasRoles("ADMIN_ROLE","HOST_ROLE", "CLIENT_ROLE"),
    param("id").isMongoId().withMessage("El ID del servicio no es válido"),
    param("id").custom(serviceExists).withMessage("El servicio no existe"),
    validarCampos,
    deleteFileOnError,
    handleErrors
];

export const validateUpdateService = [
    validateJWT,
    hasRoles("ADMIN_ROLE","HOST_ROLE"),
    param("id").isMongoId().withMessage("El ID del servicio no es válido"),
    param("id").custom(serviceExists).withMessage("El servicio no existe"),
    body("name").optional().notEmpty().withMessage("El nombre del servicio es requerido"),
    body("name").optional().isLength({ max: 50 }).withMessage("El nombre no puede exceder los 50 caracteres"),
    body("Price").optional().notEmpty().withMessage("El precio del servicio es requerido"),
    body("Price").optional().isNumeric().withMessage("El precio debe ser un número válido"),
    body("description").optional().notEmpty().withMessage("La descripción del servicio es requerida"),
    body("description").optional().isLength({ max: 200 }).withMessage("La descripción no puede exceder los 200 caracteres"),
    body("schedule").optional().notEmpty().withMessage("El horario del servicio es requerido"),
    body("schedule").optional().isLength({ max: 100 }).withMessage("El horario no puede exceder los 100 caracteres"),
    validarCampos,
    deleteFileOnError,
    handleErrors
];
export const validateDeleteService = [
    validateJWT,
    hasRoles("ADMIN_ROLE","HOST_ROLE"),
    param("id").isMongoId().withMessage("El ID del servicio no es válido"),
    param("id").custom(serviceExists).withMessage("El servicio no existe"),
    validarCampos,
    deleteFileOnError,
    handleErrors
];





