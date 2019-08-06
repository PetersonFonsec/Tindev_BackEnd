const express  = require('express')
const mongoose = require('mongoose')
const routes   = require('./routes')
const server = express()
const port = 3333

mongoose.connect('mongodb://localhost:27017/omnistack', { useNewUrlParser: true } )

server.use( express.json() )

server.use(routes)

server.listen( port, console.log(`Running on port: ${port}`) )