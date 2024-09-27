import express from "express"
import { singUp, login } from "../controllers/auth_controller.js"

const auth_router = express.Router()

auth_router.route('/signup').post(singUp)
auth_router.route('/login').post(login)

export default auth_router