const mongoose = require('mongoose')
var Schema = mongoose.Schema
const import_schema = new Schema({ any: Schema.Types.Mixed}, {strict: false})

module.exports = {

  getone: async(data_id, collection_name) => {
    let data = mongoose.model(collection_name, import_schema);
    var result = data.findOne({"_id": data_id})
    return await result
  },

  getall: async(collection_name) => {
    let data = mongoose.model(collection_name, import_schema);
    var result = data.find({})
    return await result
  },

  insert: async(collection_name, params) =>{
    let data = mongoose.model(collection_name, import_schema);
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
  },

  update: async(collection_name, data_id, params) => {
    let data = mongoose.model(collection_name, import_schema);
    const upProduct = await product.findOne({_id: data_id});
    
    await upProduct.save();
  },
  
  remove: async(collection_name, data_id) => {
    let data = mongoose.model(collection_name, import_schema);
    console.log("Delete")
    await data.deleteOne({"_id": data_id});
  }
} 