  
const mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.pluralize(null)

const import_schema = new Schema({ any: Schema.Types.Mixed}, {strict: false})

let mongo = mongoose.connect("mongodb://localhost:27017/DataBase", {useNewUrlParser: true,useUnifiedTopology: true})
let db = mongoose.connection

module.exports = {

  get: async(data_id) => {
    var result = data.findOne({"id": data_id})
    return await result;
  },

  insert: async(collection_name, data) =>{

    let data = mongoose.model(collection_name, import_schema);
    let result = data.find({})
    let example_keys = Object.keys(result[1])
    let data_keys = Object.keys(data)
    console.log(example_keys)
    console.log(data_keys)
    JSONfileContent = JSON.parse(data)
    const jsonCollection = mongoose.model(collection_name, data)
    const jsonContent = new jsonCollection(
        JSONfileContent
    )
    jsonContent.save()
  }
} 