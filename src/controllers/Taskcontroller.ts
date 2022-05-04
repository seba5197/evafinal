
import { Response, Request } from "express"
import { UpdatetaskDTO, CreatetaskDTO, taskDTO } from "../models/dto/taskDTO"
import { createTaskSchema, updateTaskSchema } from "../models/validator/taskSchema"
import taskrepositorie from "../models/repositories/TaskRespositorie"
import { UserTokenPayload } from "../models/dto/userDTO"



export default class taskcontroller {
  public readonly getAll = async (req: Request, res: Response) => {
    const iduser= req.user as UserTokenPayload
    console.log(iduser.sub+"xxxxxxxx")
    console.log("xxxxxxxx")
    const repositorie = new taskrepositorie(iduser.sub)
    const tasks: taskDTO []  = await repositorie.FindAll()
    res.json(tasks)
  }


  public readonly getById = async  (req: Request, res: Response)  => {
    const { id }= req.params
    const iduser= req.user as UserTokenPayload
    const repositorie = new taskrepositorie(iduser.sub)
    const task = await repositorie.FindbyId(parseInt(id))
    res.json(task)
  }


  public readonly Create = async  (req: Request, res: Response)  => {
    const iduser= req.user as UserTokenPayload
    const repositorie = new taskrepositorie(iduser.sub)
    const task = req.body as CreatetaskDTO
    try {
      await createTaskSchema.validateAsync(task)
    } catch(error){
      res.status(400).json({message: error.message})
      return 
    }

    try {
      const NewTasks = await repositorie.Create(task)
      res.json({
        message:NewTasks
      })
    } catch (error) {
        if(error.code=="P2002"){
          res.status(500).json({message:"title task already exists"})   
          return
        }
        console.log('Error Code: '+error.code)
        res.status(500).json({message:"Something went wrong"})
      }
  
  
  }


  public readonly Update = async  (req: Request, res: Response) => {

    const { id }= req.params
    const task = req.body as UpdatetaskDTO
    try{
      await updateTaskSchema.validateAsync(task)
    }
    catch(error){
      res.status(400).json({message: error.message})
    }
    const iduser= req.user as UserTokenPayload
    const repositorie = new taskrepositorie(iduser.sub)
      try {
        await repositorie.Update (parseInt(id), task)
        res.sendStatus(204)
        return
  
      } catch (error) {
        res.status(500).json({message:"Something went wrong"})
      }
  }
  public readonly Delete = async  (req: Request, res: Response)  => {
    const { id }= req.params
    
    const iduser= req.user as UserTokenPayload
    const repositorie = new taskrepositorie(iduser.sub)
    try {
      await repositorie.Delete (parseInt(id))
      res.sendStatus(204)
      return
    } catch (error) {
      res.status(500).json({message:"Something went wrong"})

    }

  }
  
  


} 