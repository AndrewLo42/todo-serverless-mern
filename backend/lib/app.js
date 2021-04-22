const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('../config');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const helmet = require('helmet')
app.use(helmet())
const routes = require('./routes')

mongoose.connect(config.mongoConnectionString, { useNewUrlParser: true });

app.use('/api', routes)

module.exports = app
