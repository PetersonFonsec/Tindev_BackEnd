const express = require('express')
const devController = require('./controllers/devController')
const routes = express.Router()

routes.get('/', (req, res) => {
    devController.store(req, res)
})

module.exports = routes