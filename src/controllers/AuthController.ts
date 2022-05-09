import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { generateToken, verifyToken } from "../lib/jwt";
import { CreateUserDTO } from "../models/dto/userDTO";
import userRepositorie from "../models/repositories/UserRespositorie";
import {loginSchema, registerUserSchema} from "../models/validator/loginSchema"


export default class AuthController {
    public readonly login = async(req:Request, res:Response) => {
    const credentials = req.body
    try {
        await loginSchema.validateAsync(credentials)
    } catch (error) {
        res.status(400).json({message:error})
        return
    }

    const repository = new userRepositorie()
    const userFromdb = await repository.Findbyemail(credentials.email)
    
    if (!userFromdb || !bcrypt.compareSync(credentials.password, userFromdb.password)){
        res.status(401).json({message: "invalid credentials "})
        return
    }
const token = generateToken(userFromdb)

    res.json({token})
    return res.status(200)
    }

    public readonly registerUser = async(req:Request, res:Response) => {
      
        const user= req.body as CreateUserDTO
            try {
                await registerUserSchema.validateAsync(user)
            }   
            catch (error) {

                res.status(400).json({message:error})

                return
            }
            const hashedPassword= bcrypt.hashSync(user.password, 10)
            const repository = new userRepositorie()
            
            try {
                const newUser = await repository.Create({...user, password:hashedPassword })
                res.status(200).json({newUser, message:"usuario Admin con permisos ha registrado a usuario correctamente"})
            } catch (error) {
            
               // console.log(error)
            if(error.code=="P2002"){
                console.log("xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxxxxx")
                    res.status(500).json({message:"User already exists"})   
                    return
                }
                

                console.log('Error Code: '+error.code)
                res.status(500).json({message:"Something went wrong"})
                
        }
        
    }

    public readonly getAll = async (_req: Request, res: Response) => {
        const repository = new userRepositorie()
        const users = await repository.FindAll()
        console.log(users)
        res.json(users)
    }

    public readonly getbyemail = async (req: Request, res: Response) => {
        const {email:email}= req.body
        const repository = new userRepositorie()
        console.log({email})

        const users = await repository.Findbyemail(email)
        console.log(users?.level)

        if(users?.level=="user"){
            res.json({mesagge:"este usuario no es admin"})

        }
        if(users?.level=="admin"){
            res.json({mesagge:"este usuario es admin"})
        }
        
    }

    public readonly Delete = async  (req: Request, res: Response)  => {
        const authHeader = req.headers.authorization 
        if (!authHeader){
            res.status(401).json({message:"Missing authorization header"})
            return
        }
        const { id }= req.params
        const [,token] = authHeader.split(' ')

        const decoded = verifyToken(token)
        const repositorie = new userRepositorie()
        try {
            await repositorie.Delete (parseInt(id),decoded.level)
            res.sendStatus(204)
            return
        } catch (error) {
            res.status(500).json({message:"Something went wrong"})
    
        }
    
      }


}