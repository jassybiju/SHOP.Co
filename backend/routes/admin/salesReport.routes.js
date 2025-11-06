import express from 'express'
import {authenticateUser} from '../../middlewares/auth.middleware.js'
import {checkAdminRole} from '../../middlewares/admin.middleware.js'
import { getSalesReportController, getSalesReportDownloadableController } from '../../controllers/admin/salesReport.controller.js'
const router = express.Router()

router.use(authenticateUser)
router.use(checkAdminRole)

router.get('',getSalesReportController)
router.get('/download',getSalesReportDownloadableController)


export default router