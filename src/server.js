const express  = require('express')
const mongoose = require('mongoose')
const routes   = require('./routes')
const socket   = require('socket.io')
const app = express()
const cors = require('cors')
const port = 3333
const server = require('http').Server(app)
const oi = socket(server)
const userConnected = {}

oi.on('connection', socket => {
    const { user } = socket.handshake.query
    
    userConnected[ user ] = socket.id
} )

mongoose.connect('mongodb://localhost:27017/omnistack', { useNewUrlParser: true } )

app.use( (req, res, next) => {
    req.io = oi 
    req.userConnected = userConnected  

    return next()
} )

app.use(cors())

app.use( express.json() )

app.use(routes)

server.listen( port, console.log(`Running on port: ${port}`) )