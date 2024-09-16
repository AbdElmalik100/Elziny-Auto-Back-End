import Cars from "../models/cars.js"

export const getCars = async (req, res) => {
    try {
        const filters = []
        if (req.query.slug) {
            const cars = await Cars
                .find({})
                .sort({ created_at: "desc" })
                .populate({
                    path: 'category',
                    match: { slug: req.query.slug },  // Filter `category` based on `slug`
                })
                .populate('model');  // Assuming you also have a `model` reference            
            // Filter out cars where the category wasn't matched (category will be null)
            const filteredCars = cars.filter(car => car.category !== null);
            return res.status(200).json(filteredCars);
        }

        if (req.query.category) filters.push({ category: req.query.category })
        if (req.query.model) filters.push({ model: req.query.model })
        if (req.query.fuel_type) filters.push({ fuel_type: req.query.fuel_type })
        if (req.query.is_luxury) filters.push({ is_luxury: req.query.is_luxury })

        if (filters.length > 0) {
            const cars = await Cars
                .find({ $and: filters })
                .populate("category")
                .populate("model")
            return res.status(200).json(cars)
        }

        if (+req.query.limit > 0) {
            const cars = await Cars
                .find()
                .sort({ created_at: "desc" })
                .populate("category")
                .populate('model')
                .limit(req.query.limit)
            return res.status(200).json(cars);
        }
        if (req.query.is_soldout) {
            const cars = await Cars
                .find({ is_soldout: req.query.is_soldout })
                .sort({ created_at: "desc" })
                .populate("category")
                .populate('model')
                .limit(req.query.limit)
            return res.status(200).json(cars);
        }

        const cars = await Cars
            .find()
            .sort({ created_at: "desc" })
            .populate("category")
            .populate("model")

        return res.status(200).json(cars)
    } catch (error) {
        return res.status(404).json(error)
    }
}
export const createCars = async (req, res) => {
    try {
        const data = req.body

        if (req.files.length > 0) data.images = req.files.map(file => file.filename)
        data.properties = JSON.parse(data.properties)
        const car = new Cars(data)
        await car.save()
        return res.status(201).json(car)
    } catch (error) {
        return res.status(400).json(error)
    }
}
export const getCar = async (req, res) => {
    try {
        const { id } = req.params
        const cars = await Cars
            .findById(id)
            .populate("category")
            .populate('model')

        return res.status(200).json(cars)
    } catch (error) {
        return res.status(400).json(error)
    }
}
export const updateCar = async (req, res) => {
    try {
        const { id } = req.params
        
        const data = req.body
        console.log(data);
        if (req.files.length > 0) data.images = req.files.map(file => file.filename)
        data.properties = JSON.parse(data.properties)

        const cars = await Cars.findByIdAndUpdate(id, data, { new: true })
        return res.status(200).json(cars)
    } catch (error) {
        console.log(error);

        return res.status(400).json(error)
    }
}
export const deletCar = async (req, res) => {
    try {
        const { id } = req.params
        const cars = await Cars.findByIdAndDelete(id)
        return res.status(200).json(cars)
    } catch (error) {
        return res.status(400).json(error)
    }
}