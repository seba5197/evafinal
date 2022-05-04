import express from 'express'
import Datos from './controllers/Healtcontroller'
const router = express.Router()
const healtroute = new Datos()


router.get('/info', healtroute.info)
router.get('/ping', healtroute.ping)

export default router