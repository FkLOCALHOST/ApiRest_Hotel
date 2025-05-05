import {body, param} from 'express-validator';
import { validateJWT } from './validate-jwt.js';
import { hasRoles } from './validate-roles.js';
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { deleteFileOnError } from "./delete-file-on-error.js";

export const createRoomValidator = [
    validateJWT,
    hasRoles('HOST_ROLE'),
    body('name').notEmpty().withMessage('El número de habitación es obligatorio'),
    body('hotel').isMongoId().withMessage('El hotel es obligatorio y debe ser un ID válido'),
    body('roomType').isMongoId().withMessage('El tipo de habitación es obligatorio y debe ser un ID válido'),
    body('price').isNumeric().withMessage('El precio debe ser un número'),
    body('capacity').isInt({ min: 1 }).withMessage('La capacidad debe ser un número entero mayor o igual a 1'),
    body('beds').isInt({ min: 1 }).withMessage('El número de camas debe ser un número entero mayor o igual a 1'),
    body('bathrooms').isInt({ min: 1 }).withMessage('El número de baños debe ser un número entero mayor o igual a 1'),
    body('size').notEmpty().withMessage('El tamaño es obligatorio'),
    body('status').optional().isIn(["Disponible", "Ocupada", "Mantenimiento", "Reservada", "Eliminada"]).withMessage('Estado inválido'),
    body('description').optional().isString().isLength({ max: 300 }).withMessage('La descripción no puede exceder los 300 caracteres'),
    body('images').optional().isArray().withMessage('Las imágenes deben ser un arreglo'),
    validarCampos,
    deleteFileOnError,
    handleErrors
]