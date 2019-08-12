const express = require('express')
const devController = require('./controllers/devController')
const likeController = require('./controllers/likeController')
const deslikeController = require('./controllers/deslikeController')
const routes = express.Router()

routes.get('/devs', devController.index)
routes.post('/devs', devController.store)
routes.post('/devs/:devId/likes', likeController.store)
routes.post('/devs/:devId/deslikes', deslikeController.store)

module.exports = routes