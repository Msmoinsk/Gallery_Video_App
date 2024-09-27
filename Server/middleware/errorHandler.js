import { StatusCodes } from "http-status-codes";
import CustomError from "../Errors/customErrorhandler.js";

const error_handler = async(err, req, res, next) => {
    if(err instanceof CustomError){
        return res.status(err.statusCode).json({ msg : err.message })
    }
    // console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

export default error_handler