import { Router } from 'express';
import { validateAddService, validateGetServiceById, validateDeleteService, validateUpdateService } from '../middlewares/services-validators.js';
import { addService, getServices, getServiceById, deleteService, updateService } from './services.controller.js';

const router = Router();


    router.post('/agregarServicio', validateAddService, addService);

    router.get('/', getServices);

    router.get('/:id', validateGetServiceById, getServiceById);

    router.put('/actualizarServicio/:id', validateUpdateService, updateService);

    router.delete('/eliminarServicio/:id', validateDeleteService, deleteService);


export default router;