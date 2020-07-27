const Task = require('../models/Task')

exports.insertTask = (req, res) => {

    const data = {
        ...req.body,
        username: req.username
    }

    let task = new Task(data)
    task.insertTask()
    .then(response => {
        res.send(response)
    })
    .catch(error => {
        res.send(error)
    })
}

exports.getTaskById = (req, res) => {
    Task.getTaskById(req.username, req.params.id)
    .then(response => {
        res.send(response)
    })
    .catch(error => {
        res.send(error)
    })
}

exports.getTasksByDay = (req, res) => {
    Task.getTasksByDay(req.username, req.params)
    .then(response => {
        res.send(response)
    })
    .catch(error => {
        res.send(error)
    })
}

exports.getTasks = (req, res) => {
    Task.getTasks(req.username)
    .then(response => {
        res.send(response)
    })
    .catch(error => {
        res.send(error)
    })
}

exports.updateTask = (req, res) => {

    const data = {
        ...req.body,
        username: req.username
    }

    let task = new Task(data)
    task.updateTask(req.params.id)
    .then(response => {
        res.send(response)
    })
    .catch(err => {
        res.send(error)
    })
}

exports.deleteTask = (req, res) => {
    Task.deleteTask(req.username, req.params.id)
    .then(response => {
        res.send(response)
    })
    .catch(error => {
        res.send(error)
    })
}