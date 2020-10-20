const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())

/**
 * Controllers (route handlers).
 */
const routes = require('./routes')

/**
 * API keys and Passport configuration.
 */
require('./config/passport')

// DB config
const db = require('./config/keys').MONGODB_URI

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err))

app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/', routes)

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`App is running on ${port}`))
