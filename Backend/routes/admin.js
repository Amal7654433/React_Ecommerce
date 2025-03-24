import express from 'express'
import upload from '../middlewares/multer.js';
import adminVerifyToken from '../middlewares/adminAuth.js';
import { dashboard,adminLogin,addProduct,getAllProducts,adminLogout, adminCheck } from '../controllers/adminController.js';
const router=express.Router()
router.post('/admin/login',adminLogin)
router.get('/admin/dashboard',adminVerifyToken,dashboard)
router.post('/admin/product/add',upload.single("image"),addProduct)
router.post('/admin/logout',adminLogout)
router.get('/admin/product',adminVerifyToken,getAllProducts)
router.get('/admin/check',adminVerifyToken,adminCheck)
export default router;