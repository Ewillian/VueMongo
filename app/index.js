//Import addons
const express = require('express')
const app = express()
const mongoose = require('mongoose')

//Define Port and Router Controller
const port = process.env.PORT || 6060


app.use(function(res, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
})
//Mongoose Connection Test
mongoose.connect("mongodb://localhost:27017/DataBase", { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Mongo Database with Mongoose.'))

//Use JSON Parser
app.use(express.json())

//Defines MasterRouter
const master_router = require('./routers/MasterRouter')
app.use(master_router)

//Start App
app.listen(port, () => console.log(`Server Started on port ${port}.`))