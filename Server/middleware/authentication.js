import jwt from "jsonwebtoken"
import CustomError from "../Errors/customErrorhandler.js"

const authentication = (req, res, next) => {
    try {
        const auth_token = req.headers.authorization

        if(!auth_token || !auth_token.startsWith("Bearer")){
            // res.status(400).json({msg: "Auth token not found"})
            throw new CustomError("Unauthorized.")
        }
    
        const token = auth_token.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        req.userData = {
            userID : decoded.userID,
            username : decoded.username
        }
        next()
    } catch (error) {
        next(error)
    }
}

export default authentication