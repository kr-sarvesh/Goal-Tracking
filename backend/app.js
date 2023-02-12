require('dotenv').config()
const express = require('express')
const colors = require('colors')
const app = express()
const connectToDb = require('./config/db')
const { errorHandler } = require('./middleware/errorHandler')
// const cookieParser = require('cookie-parser')

/**cookie-parser is a middleware that parses cookies attached to the client request object.*/

// const cookieParser = require('cookie-parser')

/** Importing all the routes here */
const goalRouter = require('./routers/goalRoutes')
const userRouter = require('./routers/userRoutes')
/** Connecting to the Database */
connectToDb()

/** Middlewares */
app.use(express.json())

// app.use(cookieParser())

/** Accepting the form data */
app.use(express.urlencoded({ extended: true }))

// Router Middlewares
app.use('/', goalRouter)
app.use('/', userRouter)
// app.use('/', authRouter)

/** Error Handler */
app.use(errorHandler)
/** Export app.js */
module.exports = app
