import { Router } from "express"
import { registro, login} from "./auth.controller.js"
import { registerValidator, loginValidator } from "../middlewares/usuario-validators.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"

const router = Router()

router.post(
    "/register",
    uploadProfilePicture.single("fotoPerfil"), 
    registerValidator, 
    registro
)

router.post(
    "/login",
    loginValidator,
    login
)

export default router
