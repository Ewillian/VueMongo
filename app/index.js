//Import addons
const express = require('express')
const app = express()
const mongoose = require('mongoose')
var cors = require('cors')


//Define Port and Router Controller
const port = process.env.PORT || 6060

app.use(cors())

 app.use(function(res, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Allow-Methods", "*");
     res.setHeader("Access-Control-Allow-Headers", "*");
     next();
 })

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')

//     // authorized headers for preflight requests
//     // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//     next()

//     app.options('*', (req, res) => {
//         // allowed XHR methods  
//         res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS')
//         res.send();
//     })
// })

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