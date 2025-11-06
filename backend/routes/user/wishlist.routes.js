import express from 'express'
import {authenticateUser} from '../../middlewares/auth.middleware.js'
import { addWishlistController, getAllWishlistController, removeWishlistController } from '../../controllers/user/wishlist.controller.js'

const router = express.Router()

router.use(authenticateUser)

router.post('/',addWishlistController)
router.delete('/:id',removeWishlistController),
router.get("/",getAllWishlistController)

export default router