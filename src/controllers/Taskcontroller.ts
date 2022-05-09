
import { Response, Request } from "express"
import { UpdatetaskDTO, CreatetaskDTO, taskDTO } from "../models/dto/taskDTO"
import { createTaskSchema, updateTaskSchema } from "../models/validator/taskSchema"
import taskrepositorie from "../models/repositories/TaskRespositorie"
import { UserTokenPayload } from "../models/dto/userDTO"



export default class taskcontroller {
  public readonly getAll = async (req: Request, res: Response) => {
    console.log("empezando a buscar todo")
    const iduser= req.user as UserTokenPayload
    
    console.log(iduser.sub+"xxxxxxxx")
    console.log( iduser.level)
    const repositorie = new taskrepositorie(iduser.sub, iduser.level)
    const tasks: taskDTO []  = await repositorie.FindAll()
    res.json(tasks)
  }


  public readonly getById = async  (req: Request, res: Response)  => {
    const { id }= req.params
    const iduser= req.user as UserTokenPayload
    const repositorie = new taskrepositorie(iduser.sub, iduser.level)
    const task = await repositorie.FindbyId(parseInt(id))
    res.json(task)
  }

  public readonly status = async  (req: Request, res: Response)  => {
    const { done }= req.params
    
    const iduser= req.user as UserTokenPayload
    const repositorie = new taskrepositorie(iduser.sub, iduser.level)
    const task = await repositorie.FindbyId(parseInt(done))
    console.log("buscando tarea")
    if(task?.done==true){
      res.json({message:"Esta tarea esta terminada"})
    }
    if(task?.done==false){
      res.json({message:"Esta tarea no esta terminada"})
    }
    res.json({message:"Esta tarea no se encontro o no corresponde a este usuario"})
  }

  public readonly Create = async  (req: Request, res: Response)  => {
    const iduser= req.user as UserTokenPayload
    const repositorie = new taskrepositorie(iduser.sub, iduser.level)
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
    const repositorie = new taskrepositorie(iduser.sub, iduser.level)
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
    const repositorie = new taskrepositorie(iduser.sub, iduser.level)
    try {
      await repositorie.Delete (parseInt(id))
      res.sendStatus(204)
      return
    } catch (error) {
      res.status(500).json({message:"Something went wrong"})

    }

  }
  
  


} 