import { Router } from "express";
import healtrouter from "./healthrouter";
import taskrouter from "./taskRouter";
import authRouter from "./authRouter";
import tokenValidator from "../midlewares/tokenValidator";


const apiRouter =  Router ()

apiRouter.use('/',healtrouter)
apiRouter.use('/task',tokenValidator(),taskrouter)
apiRouter.use('/auth', authRouter)
export default apiRouter