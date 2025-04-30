import { Router } from "express";
import { updateUser, deleteUser } from "./user.controller.js";
import { updateUserValidator, deleteUserValidator } from "../middlewares/user-validators.js";
 
const router = Router();

router.put("/updateUser/:uid", updateUserValidator, updateUser);

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)

export default router;