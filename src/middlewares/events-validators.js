import {body, param} from 'express-validator';
import { handleErrors } from './handle-errors.js';
import { eventExists } from '../helpers/db-validators.js';
import { validarCampos } from './validate-fields.js';
import { validateJWT } from './validate-jwt.js';
import { hasRoles } from './validate-roles.js';


export const createEventValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE', 'HOST_ROLE'),
    body('name').notEmpty().withMessage('El nombre del evento es obligatorio').custom(eventExists),
    body('cost').notEmpty().withMessage('El costo del evento es obligatorio').isNumeric().withMessage('El costo debe ser un número'),
    body('description').notEmpty().withMessage('La descripcion del evento es obligatoria').isLength({max: 200}).withMessage('La descripcion no puede exceder los 200 caracteres'),
    body('state').notEmpty().withMessage('El estado del evento es obligatorio').isIn(['Reservado', 'Disponible', 'Ocupado']).withMessage('El estado del evento no es valido'),
    body('size').notEmpty().withMessage('El tamaño del evento es obligatorio').isString().withMessage('El tamaño del evento debe ser una cadena de texto'),
    body('services').notEmpty().withMessage('El servicio del evento es obligatorio').isMongoId().withMessage('El servicio del evento no es valido'),
    body('roomType').notEmpty().withMessage('El tipo de habitacion del evento es obligatorio').isMongoId().withMessage('El tipo de habitacion del evento no es valido'),
    body('date').notEmpty().withMessage('La fecha del evento es obligatoria').isDate().withMessage('La fecha del evento no es valida'), 
    validarCampos,
    handleErrors
]

export const updateEventValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE', 'HOST_ROLE'),
    param('eid').notEmpty().withMessage('El ID del evento es obligatorio').isMongoId().withMessage('El ID no es válido').custom(eventExists),
    body('cost').optional().isNumeric().withMessage('El costo debe ser un número'),
    body('description').optional().isLength({ max: 200 }).withMessage('La descripción no puede exceder los 200 caracteres'),
    body('state').optional().isIn(['Reservado', 'Disponible', 'Ocupado']).withMessage('El estado del evento no es válido'),
    body('size').optional().isString().withMessage('El tamaño del evento debe ser una cadena de texto'),
    body('services').optional().isMongoId().withMessage('El ID del servicio no es válido'),
    body('roomType').optional().isMongoId().withMessage('El ID del tipo de habitación no es válido'),
    body('date').optional().isISO8601().toDate().withMessage('La fecha debe ser válida (ISO8601)'),
    body('image').optional().isString().withMessage('La imagen debe ser una cadena de texto'),
    validarCampos,
    handleErrors
]


export const deleteEventValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE', 'HOST_ROLE'),
    param('eid').notEmpty().withMessage('El ID del evento es obligatorio').isMongoId().withMessage('El ID no es válido').custom(eventExists),
    validarCampos,
    handleErrors
]

