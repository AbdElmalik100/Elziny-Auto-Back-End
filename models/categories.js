import mongoose from "mongoose";


const categoriesSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    slug: {
        type: String,
        lowercase: true,
        trim: true
    },
    image: {
        type: String,
    }
})



// Middleware for slug
categoriesSchema
    .pre("save", function (next) {
        if (this.isModified('name')) {
            this.slug = this.name.split(" ").join("-")
        }
        next();
    })
    .pre("findOneAndUpdate", function (next) {
        const update = this.getUpdate()
        if (update.name) update.slug = update.name.split(" ").join("-")
        next()
    })

categoriesSchema.virtual('cars', {
    ref: "Cars",
    localField: "_id",
    foreignField: "category"
})

categoriesSchema.set('toObject', { virtuals: true });
categoriesSchema.set('toJSON', { virtuals: true });

const Categories = mongoose.model('Categories', categoriesSchema)
export default Categories