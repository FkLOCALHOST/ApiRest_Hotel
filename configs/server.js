"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import apiLimiter from "../src/middlewares/rate-limit-validator.js";
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import { adminDefaultCreated } from "../src/user/user.controller.js"
import ServiceRoutes from "../src/services/services.routes.js"

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(apiLimiter);
};

const routes = (app) => {
    app.use("/hoteleria/v1/auth", authRoutes)
    app.use("/hoteleria/v1/user", userRoutes)
    app.use("/hoteleria/v1/service", ServiceRoutes)
};

const conectarDB = async () => {
    try {
        await dbConnection();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

export const initServer = () => {
    const app = express();
    try {
        middlewares(app);
        conectarDB();
        routes(app);
        adminDefaultCreated();
        const port = process.env.PORT || 3001; // Asegúrate de que el puerto sea 3002
        app.listen(port, () => {
            console.log(`Server running on port ${port} `);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};

