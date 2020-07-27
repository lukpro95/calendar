const MongoDB = require('mongodb')
const dotenv = require('dotenv')

dotenv.config()
console.log("Starting server...")
MongoDB.connect(process.env.CONNSTRING, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    module.exports = client
    console.log("Connected to the Server...")
    const app = require('../app')
    app.listen(process.env.PORT)
})