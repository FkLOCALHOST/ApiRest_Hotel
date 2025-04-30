import { hash, verify } from "argon2"
import Usuario from "../usuario/usuario.model.js"
import { generateJWT } from "../helpers/generate-jwt.js";

export const registro = async (req, res) => {
    try {
        const data = req.body;
        let fotoPerfil = req.file ? req.file.filename : null;
        const passwordEncriptada = await hash(data.password)
        data.password = passwordEncriptada
        data.fotoPerfil = fotoPerfil
        

        const usuario = await Usuario.create(data);

        return res.status(201).json({
            message: "Usuario registrado correctamente",
            nombreUsuario: usuario.nombreUsuario,
            correo: usuario.correo
        });

    }catch(err) {
        return res.status(500).json({
            message: "Error al registrar el usuario",
            error: err.message
        });
    }
}


export const login = async (req, res) => {
    const { correo, nombreUsuario, password } = req.body
    try{
        const usuario = await Usuario.findOne({
            $or:[{correo: correo}, {nombreUsuario: nombreUsuario}]
        })

        if(!usuario){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error:"No existe el usuario o correo ingresado"
            })
        }

        const validarContraseña = await verify(usuario.password, password)

        if(!validarContraseña){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(usuario.id)

        return res.status(200).json({
            message: "Login exitoso",
            nombreUsuario: usuario.nombreUsuario,
            detallesUsuario: {
                token: token,
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "Login fallido, error interno",
            error: err.message
        })
    }
}