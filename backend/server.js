/*The importing technique is CommonJS. On frontend, node modules have been used.*/
import path from 'path' 
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors' 
import morgan from 'morgan' 
import productRoutes from './routes/productRoutes.js' 
import { notFound, errorHandler } from './middleware/errorMiddleware.js' 
import userRoutes from './routes/userRoutes.js' 
import orderRoutes from './routes/orderRoutes.js' 
import uploadRoutes from './routes/uploadRoutes.js' 

dotenv.config()

connectDB()

const app = express()

app.use(express.json()) 

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/products', productRoutes) 
app.use('/api/users', userRoutes) 
app.use('/api/orders', orderRoutes) 
app.use('/api/upload', uploadRoutes) 

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

/*Error handling middleware*/
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000 

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)