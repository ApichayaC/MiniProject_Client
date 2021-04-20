const bookRoute = require('express').Router()
const booksController = require('../Controller/BooksController')

bookRoute.get('/show',booksController.get)

module.exports = bookRoute ;