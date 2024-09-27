import express from 'express'
import { 
    deleteImg, 
    getImg, 
    updateImg, 
    uploadImg 
} from '../controllers/post_controllers.js'

const post_router = express.Router()

post_router.route('/upload').post(uploadImg)
post_router.route('/images').get(getImg)
post_router.route('/image/:id').put(updateImg).delete(deleteImg)

export default post_router