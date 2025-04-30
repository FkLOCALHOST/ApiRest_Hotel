import { body, param } from "express-validator";
import { emailExists, usernameExists, userExists, dpiExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"

export const registerValidator = [
    body("name").notEmpty().withMessage("The name is required"),
    body("surname").notEmpty().withMessage("Last name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("dpi").notEmpty().withMessage("Dpi is required"),
    body("dpi").custom(dpiExists),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("This is not a valid email."),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    body("phone").notEmpty().withMessage("The phone number is required"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("This is not a valid email."),
    body("username").optional().isString().withMessage("Username is in the wrong format"),
    validarCampos,
    handleErrors
]

export const updateUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    param("uid", "Not a valid ID MONGO").isMongoId(),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
];

export const deleteUserValidator = [
    validateJWT,    
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    param("uid", "Not a valid ID MONGO").isMongoId(),
    param("uid").custom(userExists),
    handleErrors
];
