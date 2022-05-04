import { Router } from "express"

import Healtcontroller from "../controllers/Healtcontroller"


const healtRouter = Router()
const healtcontroller = new Healtcontroller()

healtRouter.get('/info', healtcontroller.info)
healtRouter.get('/ping', healtcontroller.ping)




export default healtRouter