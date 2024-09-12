import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import categoriesRouter from './routes/categories.js'
import carModelsRouter from './routes/carModel.js'
import carsRouter from './routes/cars.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

const port = process.env.PORT
const mongooseURL = process.env.MONGOOSE_URL

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

mongoose.connect(mongooseURL)
    .then(() => {
        console.log("MongoDB is running");
    }).catch(error => {
        console.log("MongoDB connection error: ", error);
    })



app.use('/api/categories', categoriesRouter)
app.use('/api/car-models', carModelsRouter)
app.use('/api/cars', carsRouter)



app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})