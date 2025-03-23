const express = require('express')
const routes = express.Router()
const {login, signup} = require('../controllers/login.controller')

routes.post('/signup',signup)
routes.post('/login',login)

module.exports = routes;