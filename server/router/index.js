const express = require('express')
const routerApi = express.Router()
const userController = require('../controllers/user-controller')
const taskController = require('../controllers/task-controller')
const { router } = require('../app')

routerApi.post('/register', userController.register)
routerApi.post('/login', userController.logIn)
routerApi.post('/logout/', userController.isLogged, userController.logOut)
routerApi.get('/isLogged', userController.isLogged, userController.confirmStatus)

routerApi.get('/tasks', userController.isLogged, taskController.getTasks)
routerApi.get('/task/:id', userController.isLogged, taskController.getTaskById)
routerApi.get('/tasks/:year/:month/:day', userController.isLogged, taskController.getTasksByDay)
routerApi.post('/task', userController.isLogged, taskController.insertTask)
routerApi.put('/task/:id', userController.isLogged, taskController.updateTask)
routerApi.delete('/task/:id', userController.isLogged, taskController.deleteTask)

routerApi.get('/', (req, res) => {
    res.send("Welcome to Skyndar API.")
})

module.exports = routerApi