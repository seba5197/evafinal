import { PrismaClient } from "@prisma/client";
import { CreatetaskDTO, taskDTO, UpdatetaskDTO } from "../dto/taskDTO";

const prisma = new PrismaClient()
export default class taskrepositorie{
    
    private userId: number 
    private level: string 

    constructor(userId:number, level:string){
        this.userId = userId
        this.level = level
    }

    public readonly FindAll = async (): Promise<taskDTO[]> => {
   
   
    
    
try {
    if (this.level == "admin"){
        let  task = await prisma.taskx.findMany()
        return task
    }

    let task = await prisma.taskx.findMany({
            
        where: {
            userID:this.userId
        }
        
    })
    return task
    
} catch (error) {

    return error
    
}
    

    
    
    }


    public readonly FindbyId = async (id:number): Promise<taskDTO | undefined> => {


        const task = await prisma.taskx.findFirst({
            where: {
                id,
                userID: this.userId
            }
        })

    
        if (this.level=="admin"){
        const task = await prisma.taskx.findFirst({
            where: {
                id
            }
        })
        if (task){}
        else{return} 
        return task
    }
    if (task){}
    else{return} 
    return task


    }


    public readonly Update = async (id:number, task:UpdatetaskDTO) => {
        if (this.level=="user" || this.level == ""){
        await prisma.taskx.updateMany({
            where: {
                id,
                userID: this.userId
            },
            data: task
        })
        }
        if (this.level=="admin"){
            await prisma.taskx.updateMany({
                where: {
                    id
                
                },
                data: task
            })

    }

    }

    public readonly Create = async (taskx: CreatetaskDTO ): Promise <taskDTO> => {
     
        let newTask = await prisma.taskx.create({
            
        data: {
            ...taskx,
            userID: this.userId
        }
        }) 
        
    
    if (this.level=="admin"){
         newTask = await prisma.taskx.create({
            
            data: {
                ...taskx
            
            }
            }) 

        
    }
    return newTask
    }
    
    public readonly Delete = async (id:number) => {

        if (this.level=="user" || this.level == ""){
        await prisma.taskx.deleteMany({
            where: {
                id,
                userID: this.userId
            }
        })
    }
    if (this.level=="admin"){
        await prisma.taskx.deleteMany({
            where: {
                id
            
            }
        })
    }
    }
}