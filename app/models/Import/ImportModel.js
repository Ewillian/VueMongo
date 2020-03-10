  
const mongoose = require('mongoose')
var Schema = mongoose.Schema
let generate = require('uuid').v4()

const import_schema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    id: String
  }, {strict: false}
  , {collection: ''})

let game = mongoose.model('import', import_schema);
let mongo = mongoose.connect("mongodb://localhost:27017/DataBase", {useNewUrlParser: true,useUnifiedTopology: true})
let db = mongoose.connection

module.exports = {}