const ObjectID = require('mongodb').ObjectID

const tasksCollection = require('../db').db().collection('tasks')

let Task = function(data) {
    this.data = {
        username:           data.username,
        taskName:           data.taskName,
        taskDate:           data.taskDate,
        taskTimeStart:      data.taskTimeStart,
        taskTimeEnd:        data.taskTimeEnd,
        taskDescription:    data.taskDescription,
        taskRepetition:     data.taskRepetition
    }
    this.errors = []
}

Task.prototype.cleanUp = function() {
    const {username, taskName, taskDate, taskTimeStart, taskTimeEnd, taskDescription, taskRepetition} = this.data

    if(typeof(taskDate) !== 'string')       {this.data.taskDate = ''}
    if(typeof(taskTimeStart) !== 'string')  {this.data.taskTimeStart = ''}
    if(typeof(taskTimeEnd) !== 'string')    {this.data.taskTimeEnd = ''}
    if(typeof(taskRepetition) !== 'number' || taskRepetition !== undefined) {this.data.taskRepetition = 0}

    this.data = {
        username:           username,
        taskName:           taskName,
        taskDate:           taskDate.trim(),
        taskTimeStart:      taskTimeStart.trim(),
        taskTimeEnd:        taskTimeEnd.trim(),
        taskDescription:    taskDescription,
        taskRepetition:     taskRepetition
    }

    console.log(this.data)
}

Task.prototype.validate = function() {
    return new Promise(resolve => {
        const {taskName, taskDate, taskTimeStart, taskTimeEnd} = this.data

        if(!taskName        || taskName === '')            {this.errors.push('Please provide a task name.')}
        if(!taskDate        || taskDate === '')            {this.errors.push('Please provide a date for the task.')}
        if(!taskTimeStart   || taskTimeStart === '')       {this.errors.push('Please provide a starting time for the task.')}
        if(!taskTimeEnd     || taskTimeEnd === '')         {this.errors.push('Please provide an ending time for the task.')}

        console.log(this.errors)
        resolve()
    })
}

Task.prototype.insertTask = function() {
    return new Promise(async (resolve, reject) => {

        this.cleanUp()
        await this.validate()

        if(!this.errors.length) {
            let newTask = await tasksCollection.insertOne(this.data)
            if(newTask) {
                resolve("Successfully created new Task!")
            } else {
                reject("Something went wrong, try again later.")
            }
        } else {
            reject(`The data which was provided was faulty or incorrect. Your data:

                ${this.errors.join('\n')}

            `)
        }
    })
}

Task.prototype.updateTask = function(id) {
    return new Promise(async (resolve, reject) => {
        this.cleanUp()
        await this.validate()

        if(!this.errors.length) {
            let updatedTask = await tasksCollection.findOneAndUpdate(
                {_id: new ObjectID(id), username: this.data.username}, 
                {$set: {
                    taskName:           this.data.taskName,
                    taskDate:           this.data.taskDate,
                    taskTimeStart:      this.data.taskTimeStart,
                    taskTimeEnd:        this.data.taskTimeEnd,
                    taskDescription:    this.data.taskDescription,
                    taskRepetition:     this.data.taskRepetition
                }}
            )
            if(updatedTask) {
                resolve("Successfully updated the Task")
            } else {
                reject("Something went wrong, try again later.")
            }
        } else {
            reject(`The data which was provided was faulty or incorrect. Your data:

                ${this.errors.join('\n')}

            `)
        }
    })
}

Task.getTaskById = function(username, id) {
    return new Promise(async (resolve, reject) => {
        try {
            let userTasks = await tasksCollection.find({username: username, _id: new ObjectID(id)}).toArray()
            resolve(userTasks)
        } catch {
            reject("Something went wrong. Try again later.")
        }
    })
}

Task.getTasks = function(username) {
    return new Promise(async (resolve, reject) => {
        try {
            let userTasks = await tasksCollection.find({username: username}).toArray()
            resolve(userTasks)
        } catch {
            reject("Something went wrong. Try again later.")
        }
    })
}

Task.getTasksByDay = function(username, date) {
    return new Promise(async (resolve, reject) => {

        if(date.month.length === 1) {date.month = `0${date.month}`}
        if(date.day.length === 1) {date.day = `0${date.day}`}

        let convertedDate = `${date.year}-${date.month}-${date.day}`

        try {
            // Fetch all tasks
            let userTasks = await Task.getTasks(username)
            
            // Filter dates to see if the routines hit given date
            // Or if the dates are exactly the given date
            userDayTasks = userTasks.filter(task => {
                var thisDay = new Date(convertedDate)
                var taskDate = new Date(task.taskDate)
                var daysDifference = (thisDay.getTime() - taskDate.getTime())/(1000*60*60*24)
                
                if(task.taskRepetition) {
                    if((daysDifference.toFixed(0)*1) % task.taskRepetition === 0 && daysDifference >= 0) {
                        return task
                    }
                } else {
                    if(convertedDate === task.taskDate) {
                        return task
                    }
                }
            })

            // sort by starting time
            userDayTasks = userDayTasks.sort((a, b) => {
                let aTime = parseInt(a.taskTimeStart.substring(0,2)) + parseInt(a.taskTimeStart.substring(3, 5))
                let bTime = parseInt(b.taskTimeStart.substring(0,2)) + parseInt(b.taskTimeStart.substring(3, 5))
                return aTime - bTime
            })

            if(userDayTasks.length > 0) {
                resolve(userDayTasks)
            } else {
                reject("It seems you have nothing scheduled on that day.")
            }
        } catch {
            reject("Something went wrong. Try again later.")
        }
    })
}

Task.deleteTask = function(username, id) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(`deleting ${username} ${id}`)
            console.log(id)
            await tasksCollection.deleteOne({username: username, _id: new ObjectID(id)})
            resolve("Successfully deleted this task.")
        } catch {
            reject("We are sorry. Something went wrong - try again later.")
        }
    })
}

module.exports = Task