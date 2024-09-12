import multer from "multer"

const categoriesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/categories/')
    },
    filename: function (req, file, cb) {        
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }
})
const carsStroage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/cars/')
    },
    filename: function (req, file, cb) {        
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }
})

export const categoriesUploadMiddleWare = multer({ storage: categoriesStorage })
export const carsUploadMiddleWare = multer({ storage: carsStroage })