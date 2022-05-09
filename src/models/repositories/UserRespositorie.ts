

import { PrismaClient } from "@prisma/client";
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO, UserDTO } from "../dto/userDTO";

const prisma = new PrismaClient()
export default class userRepositorie{


    public readonly FindAll = async (): Promise<UserDTO[]> => {
        const Users = await prisma.userx.findMany()

        const UserWithoutPassword = Users.map(user => {
            const {password, ...UserWithoutPassword} = user
            return UserWithoutPassword 
        })
        return UserWithoutPassword
    }


    public readonly FindbyId = async (id:number): Promise<UserDTO | undefined> => {
    
        const User = await prisma.userx.findUnique({
            where: {
                id
                
            }
        })

        if (User){}
        else{return} 

        const {password, ...UserWithoutPassword} = User
        return UserWithoutPassword
    }
    public readonly Findbyemail = async (email:string): Promise<LoginUserDTO | undefined> => {
    
        const user = await prisma.userx.findUnique({
            where: {
                email
                
            }
        })

        if (user){}
        else{return} 

        //const {firsName,lastName, ...loginx} = loginx
        return user
    }

    

    public readonly Update = async (id:number, user:UpdateUserDTO) => {
        await prisma.userx.update({
            where: {
               
                id
            },
            data: user

        })
    
    }
    public readonly Create = async (userx: CreateUserDTO ): Promise <UserDTO> => {

        const newUser = await prisma.userx.create({
        data: {
            ...userx,
        }

        }) 

        const {password, ...UserWithoutPassword} = newUser
        return UserWithoutPassword
      

    }
    public readonly Delete = async (id:number,level:string) => {

        if(level=="admin"){
        await prisma.userx.delete({
            where: {
                id
            }

        })
        return ("usuario eliminado")
    }else{
        const permiso ="no tienes permiso para borrar "
        return permiso
    }   
    }

}