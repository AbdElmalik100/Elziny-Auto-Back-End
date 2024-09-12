import CarModel from '../models/carModel.js'

export const getCarModels = async (req, res) => {
    try {
        if (req.query.category) {
            const carModels = await CarModel
                .find()
                .populate({
                    path: "category",
                    match: { slug: req.query.category }
                })
            const filteredCarsModels = carModels.filter(model => model.category !== null)
            return res.status(200).json(filteredCarsModels)
        }
        if (req.query.categoryId) {
            const carModels = await CarModel
                .find({category: req.query.categoryId})
                .populate("category")
            return res.status(200).json(carModels)
        }
        const carModels = await CarModel.find()
        return res.status(200).json(carModels)
    } catch (error) {
        return res.status(404).json(error)
    }
}
export const createCarModel = async (req, res) => {
    try {
        const data = req.body
        const carModel = new CarModel(data)
        await carModel.save()

        return res.status(201).json(carModel)
    } catch (error) {
        return res.status(400).json(error)
    }
}


export const getCarModel = async (req, res) => {
    try {
        const { id } = req.params
        const carModel = await CarModel.findById(id)
        if (!carModel) return res.status(404).json("sub category document with this ID not found")
        return res.status(200).json(carModel)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const updateCarModel = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const carModel = await CarModel.findByIdAndUpdate(id, data, { new: true })
        return res.status(200).json(carModel)
    } catch (error) {
        return res.status(400).json(error)
    }
}
export const deleteCarModel = async (req, res) => {
    try {
        const { id } = req.params
        const carModel = await CarModel.findByIdAndDelete(id)
        return res.status(200).json(carModel)
    } catch (error) {
        return res.status(400).json(error)
    }
}