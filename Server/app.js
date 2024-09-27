import express from "express"
import dotenv from "dotenv"
import 'express-async-errors'
// require('express-async-errors')
import xss from 'xss-clean'
import helmet from 'helmet'
import cors from 'cors'
import auth_router from "./routes/auth_route.js"
import post_router from "./routes/post_route.js"
import authentication from "./middleware/authentication.js"
import { not_found } from "./middleware/notFound.js"
import error_handler from './middleware/errorHandler.js'

dotenv.config()

const app = express()

// Extra packages + security Packages
app.use(express.json())
app.use(cors())
app.use(helmet())  // secure http Headers
app.use(xss())  

// Routes
app.use('/api/v1/user', auth_router)
app.use('/api/v1/user/img' ,authentication, post_router)

// Error Handlers
app.use(not_found)
app.use(error_handler)

const port = process.env.PORT || 8800
const start_server = async () => {
    try{
        app.listen(port, () => {
            console.log(`Server is started at PORT ${port}.....`)
        })
    } catch (errors) {
        console.log(errors)
    }
}

start_server()