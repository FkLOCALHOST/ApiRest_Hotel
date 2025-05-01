import User from "./user.model.js";
import { hash, verify } from "argon2";

export const adminDefaultCreated = async (req, res) => {
    try{

        const defaultAdmin = await User.findOne({ email: "Dabp@gmail.com" });
        const encryptedPassword = await hash("dBerc1an!")

        if(!defaultAdmin){
            const newAdmin = new User({
                name: "Diego Adolfo",
                surname: "Bercian Pérez",
                username: "Dabp",
                dpi: "1478523698563",
                email: "Dabp@gmail.com",
                password: encryptedPassword,
                phone: "49099817",
                role: "ADMIN_ROLE"
            })
    
            await newAdmin.save();
            console.log("Administrator created successfully")
        }

       
    }catch(err){
        console.log(`Error creating general administrator: ${err.message}`)
    }
};


export const updateUser = async (req, res) => {
    try{
        const { uid } = req.params;
        const data = req.body;
        const userToken = req.usuario;

        if((userToken.id).toString() !== uid && userToken.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                success: false,
                msg: 'No tienes permisos para modificar este usuario'
            });
        }

        const user = await User.findByIdAndUpdate(uid, data, { new: true });

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            msg: 'User Update',
            user
        });


    }catch(err){
        res.status(500).json({
            success: false,
            msg: 'Error updating user',
            error: err.message
        });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params; 
        const userToken = req.usuario;

        if((userToken._id).toString() !== uid && userToken.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to delete this user'
            });
        }

        const userUpdate = await User.findByIdAndUpdate(uid, {status: false}, { new: true });

        if (!userUpdate) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User account successfully deactivated',
            user: userUpdate
        });

    }catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error deactivating user account',
            error: err.message
        });
    }
};