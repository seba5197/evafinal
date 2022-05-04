import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../lib/jwt";

export default function tokenValidator() {

    return function (req:Request, res:Response, next:NextFunction){
        const authHeader = req.headers.authorization 
        if (!authHeader){
            res.status(401).json({message:"Missing authorization header"})
            return
        }
        const [bearer,token] = authHeader.split(' ')
        //console.log (token+"<------------")
        if (bearer!=="Bearer"){
            res.status(401).json({message:"Missing authorization header <Bearer>"})
            return
        }
        try {
            const decoded = verifyToken(token)
            req.user = decoded
        } catch {
            res.status(401).json({message:"Missing authorization header"})
            return
        }
        return next()
    }
}
