const usersCollection = require('../db').db().collection('users')
const sessionsCollection = require('../db').db().collection('sessions')
const bcrypt = require('bcrypt')
const md5 = require('md5')
const ObjectID = require('mongodb').ObjectID

let User = function(dataReceived) {
    this.data = {
        username: dataReceived.username,
        password: dataReceived.password
    }
    this.errors = []
}

User.prototype.cleanUp = function() {
    if(typeof(this.data.username) !== 'string') {this.data.username = ''}
    if(typeof(this.data.password) !== 'string') {this.data.password = ''}

    this.data = {
        username: this.data.username.trim(),
        password: this.data.password
    }
}

User.prototype.validate = function() {
    return new Promise(async(resolve) => {
        const {username, password} = this.data
        if(!username.length) {this.errors.push("You must provide username.")}
        if(!password.length) {this.errors.push("You must provide password.")}
        if(username.length < 4 && username.length > 20) {this.errors.push("Username must be between 4 and 20 characters long.")}
        if(password.length < 6 && password.length > 40) {this.errors.push("Password must be between 6 and 40 characters long.")}
        
        let user = await usersCollection.findOne({username: username})
        if(user) {this.errors.push("This username is already in use. Try different one.")}

        resolve()
    })
}

User.prototype.register = function() {
    return new Promise(async (resolve, reject) => {
        // Step #1: Validate user data
        this.cleanUp()
        await this.validate()
    
        // Step #2: Only if! there are no validation errors then save the user data into a database
        if (!this.errors.length) {
            // hash user password
            let salt = bcrypt.genSaltSync(10)
            this.data.password = bcrypt.hashSync(this.data.password, salt)
            await usersCollection.insertOne(this.data)
            
            resolve()
        } else {
            reject(this.errors)
        }
    })
}

User.prototype.logIn = function() {
    return new Promise(async (resolve, reject) => {
        // Step #1: Validate user data
        this.cleanUp()

        usersCollection.findOne({username: this.data.username}).then((attemptedClient) => {
            if(attemptedClient && bcrypt.compareSync(this.data.password, attemptedClient.password)){
                this.data = attemptedClient

                let object = {username: this.data.username, _id: this.data._id}

                resolve(object)
            } else {
                reject("Invalid username / password.")
            }
        }).catch(() => {
            reject("Please try again later.")
        })
    
    })
}

module.exports = User