
import express from 'express'
import { authenticateUser } from '../../middlewares/auth.middleware.js'
import { checkAdminRole } from '../../middlewares/admin.middleware.js'
import { dashboardController } from '../../controllers/admin/adminDashboard.controller.js'

const router = express.Router()

router.use(authenticateUser)
router.use(checkAdminRole)

router.get('/',dashboardController)

export default router