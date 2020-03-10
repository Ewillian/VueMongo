  
const mongoose = require('mongoose')
var Schema = mongoose.Schema
let generate = require('uuid').v4()

const import_schema = new Schema({ any: Schema.Types.Mixed}, {strict: false})


let data = mongoose.model('DataBase', import_schema);
let mongo = mongoose.connect("mongodb://localhost:27017/DataBase", {useNewUrlParser: true,useUnifiedTopology: true})
let db = mongoose.connection

module.exports = {

  get: async(data_id) => {
    var result = data.findOne({"_id": data_id})
    return await result;
  },

  insert: async(params) =>{
    console.log("insert")
    let newid = require('uuid').v4()
    let collection = params;
    JSON.stringify(collection)
    let new_data = new data(collection)
    console.log(new_data)
    new_data.save()
    .then(() => {
      return "201"
    })
    .catch(err => {
      return err
    })

  }
}