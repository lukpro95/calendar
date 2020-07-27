const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.register = function(req, res) {
    let user = new User(req.body)
    user.register()
    .then(() => {
        res.send("Thanks for registering!")
    })
    .catch(err => {
        res.send(err)
    })
}

exports.logIn = function(req, res) {

    let user = new User(req.body)
    user.logIn()
    .then(function(){
        let token = jwt.sign({username: req.body.username}, process.env.JWTSECRET, {expiresIn: '7d'})
        res.cookie('user', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: false
        })
        res.cookie('username', req.body.username, { 
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: false,
            secure: false
        })
        res.json("Thanks, logged in!")
    })
    .catch(function(e){
        res.json("Invalid login / password.")
    })
}

exports.logOut = function(req, res) {

    try {
        let token = jwt.sign({username: req.body.username}, process.env.JWTSECRET, {expiresIn: '1s'})
        res.cookie('user', token, {
            maxAge: 1000,
            httpOnly: true,
            secure: false
        })
        res.json("Successfully logged out.")
    } catch {
        res.json("Something went wrong, try again later.")
    }

}

exports.isLogged = function(req, res, next) {
    try {
        let cookieDivider = req.headers.cookie.split('user=')
        req.username = cookieDivider[0].substring(9, cookieDivider[0].length-2)
        jwt.verify(cookieDivider[1], process.env.JWTSECRET)
        next()
    } catch {
        res.send(false)
    }
}

exports.confirmStatus = function(req, res) {
    res.send(true)
}