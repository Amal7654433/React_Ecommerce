import express from 'express'
const router = express.Router()
import { registerUser, userLogin, userHome, userLogout, createOrder ,getUserOrders} from '../controllers/userController.js'
import verifyToken from '../middlewares/userAuth.js'
router.post('/register', registerUser)
router.post('/login', userLogin)
router.post('/logout', userLogout)
router.get('/home',verifyToken, userHome)
router.post('/order/create', createOrder)
router.get('/order',verifyToken,getUserOrders )
export default router;