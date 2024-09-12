import express from 'express'
import { categoriesUpload, createCategory, deleteCategory, getCategories, getCategory, updateCategory } from '../controllers/categories.js'
import { categoriesUploadMiddleWare } from '../middlewares/multer.js'

const router = express.Router()

router.route('/')
    .get(getCategories)
    .post(categoriesUploadMiddleWare.single("image"), createCategory)

router.route('/upload')
    .post(categoriesUploadMiddleWare.single("image"), categoriesUpload)

router.route('/:id')
    .get(getCategory)
    .patch(updateCategory)
    .delete(deleteCategory)

export default router