import mongoose from "mongoose";
import Categories from "./categories.js";

const carModelSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        trim: true
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Categories
    }
})

const CarModel = mongoose.model("CarModel", carModelSchema)
export default CarModel