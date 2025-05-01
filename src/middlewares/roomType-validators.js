import { body, param } from 'express-validator';
import { handleErrors } from './handle-errors.js';
import { roomTypeExists } from "../helpers/db-validators.js";
import { validarCampos } from './validate-fields.js';
import { validateJWT } from './validate-jwt.js';
import { hasRoles } from './validate-roles.js';

export const addRoomTypeValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "HOST_ROLE"),
    body("roomTypeName").notEmpty().withMessage("The room type name is required"),
    body("roomTypeDescription").notEmpty().withMessage("The room type description is required"),
    validarCampos,
    handleErrors
];

export const updateRoomTypeValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "HOST_ROLE"),
    param("id").isMongoId().withMessage("The id is not a valid Mongo id").custom(roomTypeExists).withMessage("The room type does not exist"),
    param("id").custom(roomTypeExists),
    validarCampos,
    handleErrors
];

export const deleteRoomTypeValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "HOST_ROLE"),
    param("id").isMongoId().withMessage("The id is not a valid Mongo id").custom(roomTypeExists).withMessage("The room type does not exist"),
    param("id").custom(roomTypeExists),
    validarCampos,
    handleErrors
];