require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMidleware = require('./middlewares/error.midleware')
// const errorMiddleware = require('./middlewares/error.middleware')

const app = express()

// Middleware
app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api', require('./routes/index'))


app.use(errorMidleware)

// Error handling
// app.use(errorMiddleware)

const bootstrap = async () => {
	try {
		const PORT = process.env.PORT || 5000
		mongoose.connect(process.env.MONGO_URL).then(() => console.log('Connected to MongoDB'))
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
	} catch (error) {
		console.log('Error connecting to MongoDB:', error)
	}
}

bootstrap()

// https://www.mongodb.com/try/download/community - Download MongoDB Community Server
// https://www.mongodb.com/try/download/compass - Download MongoDB Compass