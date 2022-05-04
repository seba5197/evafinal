import { Router } from "express";
import AuthController from "../controllers/AuthController";

const authRouter = Router()
const controller = new AuthController()

authRouter.post('/login', controller.login)
authRouter.post('/register', controller.registerUser)
authRouter.get('/all', controller.getAll)
export default authRouter