import express from 'express'
import { createCars, deletCar, getCar, getCars, updateCar } from '../controllers/cars.js'
import { carsUploadMiddleWare } from '../middlewares/multer.js'

const router = express.Router()

router.route('/')
    .get(getCars)
    .post(carsUploadMiddleWare.array("images"), createCars)

router.route('/:id')
    .get(getCar)
    .patch(carsUploadMiddleWare.array("images"), updateCar)
    .delete(deletCar)


export default router