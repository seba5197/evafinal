import { Router } from "express";
import AuthController from "../controllers/AuthController";
import userValidator from "../midlewares/userValidator";

const authRouter = Router()
const controller = new AuthController()

authRouter.post('/login', controller.login)
authRouter.post('/register',userValidator(), controller.registerUser)
authRouter.get('/all',userValidator(), controller.getAll)
authRouter.delete('/:id',userValidator(), controller.Delete)
//authRouter.update('/update/:id',userValidator(), controller.update)
authRouter.get('/email',userValidator(), controller.getbyemail)
export default authRouter