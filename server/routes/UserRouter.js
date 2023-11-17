const express = require('express')
const route = express.Router()

const UserRoutes = require('../controller/UserController')


route.get('/users', UserRoutes.ViewUsers)
route.get('/users/:id', UserRoutes.ViewUserById)
route.post('/users', UserRoutes.CreateUser)
route.put('/users/:id', UserRoutes.UpdateUser)
route.delete('/users/:id', UserRoutes.UpdateUser)


module.exports = route