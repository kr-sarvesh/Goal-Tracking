require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

/**cookie-parser is a middleware that parses cookies attached to the client request object.*/

const cookieParser = require('cookie-parser')

/** Connecting to the Database */
connectToDb()

/** Middlewares */
app.use(express.json())
app.use(cookieParser())

/** Accepting the form data */
app.use(express.urlencoded({ extended: true }))

// Router Middlewares
app.use('/api/routes', goalRouter)
app.use('/api/auth', authRouter)

/** Export app.js */
module.exports = app
