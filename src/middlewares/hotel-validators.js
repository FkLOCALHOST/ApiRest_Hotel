import {body, param} from 'express-validator';
import { validateJWT } from './validate-jwt.js';
import { hasRoles } from './validate-roles.js';
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { deleteFileOnError } from "./delete-file-on-error.js";


export const createHotelValidator = [
    validateJWT,
    hasRoles('HOST_ROLE'),
    body('name').notEmpty().withMessage('Name is required'),
    body('address.country').notEmpty().withMessage('Country is required'),
    body('address.city').notEmpty().withMessage('City is required'),
    body('address.street').notEmpty().withMessage('Street is required'),
    body('rating').isFloat({min: 0, max: 5}).withMessage('Rating must be between 0 and 5'),
    body('type').notEmpty().withMessage('Type is required'),
    body('phone').isLength({min: 8, max: 8}).withMessage('Phone must be 8 digits long'),
    body('checkInTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Check-in time must be in HH:MM format'),
    body('checkOutTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Check-out time must be in HH:MM format'),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const getAllHotelsValidator = [
    validateJWT,
    handleErrors
]

export const getHotelsByNameValidator = [
    validateJWT,
    body('name').notEmpty().withMessage('Name is required'),
    validarCampos,
    handleErrors
]

export const getHotelByIdValidator = [
    validateJWT,
    param('id').isMongoId().withMessage('Invalid hotel ID format'),
    validarCampos,
    handleErrors
]


export const updateHotelValidator = [
    validateJWT,
    hasRoles('HOST_ROLE'),
    param('id').isMongoId().withMessage('Invalid hotel ID format'),
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('address.country').optional().notEmpty().withMessage('Country is required'),
    body('address.city').optional().notEmpty().withMessage('City is required'),
    body('address.street').optional().notEmpty().withMessage('Street is required'),
    body('rating').optional().isFloat({min: 0, max: 5}).withMessage('Rating must be between 0 and 5'),
    body('type').optional().notEmpty().withMessage('Type is required'),
    body('phone').optional().isLength({min: 8, max: 8}).withMessage('Phone must be 8 digits long'),
    body('checkInTime').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Check-in time must be in HH:MM format'),
    body('checkOutTime').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Check-out time must be in HH:MM format'),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const deleteHotelValidator = [
    validateJWT,
    hasRoles('HOST_ROLE'),
    param('id').isMongoId().withMessage('Invalid hotel ID format'),
    validarCampos,
    handleErrors
]
