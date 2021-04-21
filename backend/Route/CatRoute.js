const catRoute = require('express').Router()
const catsController = require('../Controller/CatsController')

catRoute.get('/show',catsController.get)
catRoute.post('/add',catsController.post)

catRoute.put('/update/:catID',catsController.update)
catRoute.delete('/delete/:catID',catsController.delete)

module.exports = catRoute ;