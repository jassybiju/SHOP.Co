import express from 'express'
import { authenticateUser } from '../../middlewares/auth.middleware.js'
import { checkAdminRole } from '../../middlewares/admin.middleware.js'
import {  getAllProductsStockController, restokeProductController } from '../../controllers/admin/stock-management.controller.js'

const router= express.Router()

router.use(authenticateUser)
router.use(checkAdminRole)

router.get('/',getAllProductsStockController)
router.patch('/:id',restokeProductController)

export default router