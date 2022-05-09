import { UserDTO, UserTokenPayload } from "../models/dto/userDTO";
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET as string
if(!secret){
    throw new Error("JWT not found");
    
}

export function generateToken (user:UserDTO){

    return jwt.sign(
        {sub: user.id, email: user.email, level:user.level}, 
    secret,
    {expiresIn: "7d"}
        )
}

export function verifyToken(token: string):UserTokenPayload {
    const verified = jwt.verify(token,secret)

    return verified as unknown as UserTokenPayload
}