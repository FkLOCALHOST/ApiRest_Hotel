import { body, param } from "express-validator";
import { correoExists, usuarioExists, userExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"

export const registerValidator = [
    body("nombres").notEmpty().withMessage("El nombre es requerido"),
    body("apellidos").notEmpty().withMessage("El nombre es requerido"),
    body("nombreUsuario").notEmpty().withMessage("El nombre de usuario es requerido"),
    body("correo").notEmpty().withMessage("El email es requerido"),
    body("correo").isEmail().withMessage("No es un correo válido"),
    body("correo").custom(correoExists),
    body("nombreUsuario").custom(usuarioExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    body("telefono").notEmpty().withMessage("El número de telefono es requerido"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const loginValidator = [
    body("correo").optional().isEmail().withMessage("No es un correo válido"),
    body("nombreUsuario").optional().isString().withMessage("Username es en formáto erróneo"),
    validarCampos,
    handleErrors
]

export const updateUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    param("uid", "No es un ID válido").isMongoId(),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
];

export const deleteUserValidator = [
    validateJWT,
    validarCampos,
    handleErrors
];
