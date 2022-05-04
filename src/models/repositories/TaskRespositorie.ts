import { PrismaClient } from "@prisma/client";
import { CreatetaskDTO, taskDTO, UpdatetaskDTO } from "../dto/taskDTO";

const prisma = new PrismaClient()
export default class taskrepositorie{
    
    private userId: number 
    
    constructor(userId:number){
        this.userId = userId
    }

    public readonly FindAll = async (): Promise<taskDTO[]> => {
       
        const task = await prisma.taskx.findMany({
            
            where: {
                userID:this.userId
            }
        })
        return task
    
    }


    public readonly FindbyId = async (id:number): Promise<taskDTO | undefined> => {
    
        const task = await prisma.taskx.findFirst({
            where: {
                id,
                userID: this.userId
            }
        })
        if (task){}
        else{return} 
        return task
    }


    public readonly Update = async (id:number, task:UpdatetaskDTO) => {
        await prisma.taskx.updateMany({
            where: {
                id,
                userID: this.userId
            },
            data: task
        })
    
    }

    public readonly Create = async (taskx: CreatetaskDTO ): Promise <taskDTO> => {
        const newTask = await prisma.taskx.create({
        data: {
            ...taskx,
            userID: this.userId
        }
        }) 
        return newTask
        }
    
    public readonly Delete = async (id:number) => {
        await prisma.taskx.deleteMany({
            where: {
                id,
                userID: this.userId
            }
        })
        
    }
}