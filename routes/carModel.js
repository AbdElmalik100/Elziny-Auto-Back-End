import express from 'express'
import { createCarModel, deleteCarModel, getCarModel, getCarModels, updateCarModel } from '../controllers/carModel.js'



const router = express.Router()

router.route("/")
    .get(getCarModels)
    .post(createCarModel)

router.route("/:id")
    .get(getCarModel)
    .patch(updateCarModel)
    .delete(deleteCarModel)


export default router