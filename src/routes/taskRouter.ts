import { Router } from "express";
import taskcontroller from "../controllers/Taskcontroller";



const taskrouter = Router()
const controller = new taskcontroller()

taskrouter.get('/', controller.getAll)
taskrouter.get('/:id', controller.getById)
taskrouter.get('/status/:done', controller.status)
taskrouter.post('/', controller.Create)
taskrouter.put('/:id', controller.Update)
taskrouter.delete('/:id', controller.Delete)

export default taskrouter