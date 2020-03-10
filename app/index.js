//import addons
const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
//const cors = require('cors')
const app = express();

//Define Port and Router Controller
const port = process.env.PORT || 6060
const master_router = ('./routers/MasterRouter.js')

//Use addons
app.use(bodyparser.json)
app.use(cors())

app.use(master_router)

//Node server
app.listen(port, () => console.log(`Server Started on port ${port}.`))

//Mongoose Connection
mongoose.connect("mongodb://localhost:27017/DataBase", { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Mongo Database with Mongoose.'))