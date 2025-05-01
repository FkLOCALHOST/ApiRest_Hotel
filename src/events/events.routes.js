import {Router} from 'express'
import { createEvent, updateEvent, getEvents, deleteEvent, searchEvent} from './events.controller.js'
import { uploadEventPicture } from '../middlewares/multer-uploads.js'
import { createEventValidator, updateEventValidator, deleteEventValidator } from '../middlewares/events-validators.js'
import {deleteFileOnError} from '../middlewares/delete-file-on-error.js'



const router = Router()


router.post(
    "/createEvent", 
    uploadEventPicture.single("image"), 
    createEventValidator, 
    deleteFileOnError,
    createEvent
)

router.get("/", getEvents)


router.put(
    "/updateEvent/:eid", 
    uploadEventPicture.single("image"), 
    updateEventValidator, 
    deleteFileOnError,
    updateEvent
)

router.delete(
    "/deleteEvent/:eid", 
    deleteEventValidator, 
    deleteEvent
)

router.get("/searchEvent/:name", searchEvent)

export default router