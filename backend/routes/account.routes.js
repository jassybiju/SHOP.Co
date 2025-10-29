import express from 'express'
import { authenticateUser } from '../middlewares/auth.middleware.js'
import { addAddressController, changeEmailController, changePasswordController, deleteAddressController, editAddressController, editPrfileController,  getAddressController,  getAllAddressController, getCouponsController, setToPrimaryAddressController } from '../controllers/account.controller.js'
import upload from '../middlewares/multer.js'

const router = express.Router()

router.use(authenticateUser)

router.put('',upload.array('image',1),editPrfileController)
router.patch('/change-email', changeEmailController)
router.patch('/change-password', changePasswordController)

router.post('/address', addAddressController)
router.get('/address', getAllAddressController)
router.get('/address/:id', getAddressController)
router.delete('/address/:id', deleteAddressController)
router.put('/address/:id', editAddressController)
router.patch('/address/set-as-primary/:id', setToPrimaryAddressController)
// router.get('address', getAddressController)

router.get('/coupons',getCouponsController)

export default router