  
const mongoose = require('mongoose')
var Schema = mongoose.Schema

const import_schema = new Schema({ any: Schema.Types.Mixed}, {strict: false})


let data = mongoose.model('test', import_schema);
let mongo = mongoose.connect("mongodb://localhost:27017/DataBase", {useNewUrlParser: true,useUnifiedTopology: true})
let db = mongoose.connection

module.exports = {

  get: async(data_id) => {
    console.log(data.collection.collectionName)
    var result = data.findOne({"_id": "5e67bbe54b945e577482035f"})
    return await result
  },

  insert: async(params) =>{
    console.log("insert")
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