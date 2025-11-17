import express from 'express'
import { getHomeData, getProductData, getSearchData } from '../controllers/home.controller.js'

const router = express.Router()


router.get('/',getHomeData)
router.get('/search',getSearchData)
router.get('/product/:id',getProductData)


export default router