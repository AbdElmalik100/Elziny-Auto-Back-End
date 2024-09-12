import Categories from "../models/categories.js"



export const getCategories = async (req, res) => {
    try {
        const categories = await Categories.find().populate("cars")
        return res.status(200).json(categories)
    } catch (error) {
        console.log(error);
        return res.status(404).json(error)
    }
}

export const createCategory = async (req, res) => {
    try {
        const data = req.body
        data.image = req.file ? req.file.filename : null

        const category = new Categories(data)
        await category.save()

        return res.status(201).json(category)

    } catch (error) {
        console.log(error);

        return res.status(400).json(error)
    }
}

export const getCategory = async (req, res) => {
    try {
        const { id } = req.params

        const category = await Categories.findById(id)
        if (!category) return res.status(404).json("category document with this ID not found")
        return res.status(200).json(category)

    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
}
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        const category = await Categories.findByIdAndUpdate(id, data, { new: true })

        return res.status(200).json(category)

    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params
        const category = await Categories.findByIdAndDelete(id, { new: true })
        if (!category) return res.status(404).json("category docuemetn with this ID not found")
        return res.status(200).json(category)
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
}

export const categoriesUpload = async (req, res) => {
    try {
        const file = req.file
        return res.status(200).json(file)
    } catch (error) {
        return res.status(400).json(error)
    }
}