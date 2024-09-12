import mongoose from "mongoose";
import Categories from "./categories.js";
import CarModel from "./carModel.js";

const carsSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Categories
    },
    model: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: CarModel
    },
    fuel_type: {
        type: String,
        enum: ['petrol', 'electric'],
        default: "petrol"
    },
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String
    },
    properties: {
        type: Map,
        of: String
    },
    price: {
        type: String,
        default: "price on request"
    },
    images: {
        type: [String],
        default: []
    },
    is_soldout: {
        type: Boolean,
        default: false
    },
    is_luxury: {
        type: Boolean,
        default: false
    }
})

const Cars = mongoose.model("Cars", carsSchema)
export default Cars