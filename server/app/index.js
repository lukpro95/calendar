const express = require('express')
const routerApi = require('../router')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors');

app.use(cors(
    {origin: 'http://localhost:3001', credentials: true}
))

app.use(function(req, res, next){
    res.setHeader('X-XSS-Protection','1; mode=block');
    res.setHeader('Strict-Transport-Security','max-age=31536000; includeSubDomains; preload');
    next()
})

app.use(bodyParser.json())

app.use('/api', routerApi)

module.exports = app