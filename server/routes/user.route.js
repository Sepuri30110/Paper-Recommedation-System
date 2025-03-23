const express = require('express')
const routes = express.Router()
const {getFilters, getData, saveEmail, recommend} = require('../controllers/user.controller')

routes.get('/getFilters', getFilters)
routes.post('/getData', getData)
routes.post('/saveEmail',saveEmail)
routes.post('/recommend',recommend)

module.exports = routes;