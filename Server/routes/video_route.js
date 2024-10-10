import express from 'express'

import { 
    uploadVideo,
    getVideo,
    updateVideo,
    deleteVideo,
 } from '../controllers/video_controller.js'

const video_router = express.Router()

video_router.route('/upload').post(uploadVideo)
video_router.route('/videos').get(getVideo)
video_router.route('/video/:id').put(updateVideo).delete(deleteVideo)

export default video_router