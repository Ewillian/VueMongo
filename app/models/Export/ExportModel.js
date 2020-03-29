const mongoose = require('mongoose')
var Schema = mongoose.Schema
const export_schema = new Schema({ any: Schema.Types.Mixed}, {strict: false})
mongoose.pluralize(null)

module.exports = {

  get: async(data_id, collection_name) => {
    let data = mongoose.model(collection_name, export_schema);
    var result = data.findOne({"_id": data_id})
    return await result;
  },

  getall: async(collection_name) => {
    let data = mongoose.model(collection_name, export_schema);
    var result = data.find({})
    return await result
  },

  insertOne: async(collection_name, params, example_datas) =>{
    let data = mongoose.model(collection_name, export_schema)
    let test = true

    // Traitement des clefs de donnée exemple
    example_keys = example_datas[0]
    delete example_keys["_id"]
    delete example_keys['__v']
    example_keys = Object.keys(example_keys)

    // Traitement des clefs de donnée cible
    target_keys = Object.keys(params)
    
    for (let index = 0; index < target_keys.length; index++) {
      const element = target_keys[index]
      if(example_keys[index] != element){
        test = false
      }
    }
    console.log(test)
    // Vérification
    if(test == true){
      // Dans Base de donnée
      console.log("push")
      let collection = params
      console.log(collection)
      let new_data = new data(collection)
      new_data.save()
      .then(() => {
        return "201"
      })
      .catch(err => {
        return err
      })
    }
    else{
      // Error
      return false
    }
  },

  insertMany: async(collection_name, params, example_datas) =>{
    let data = mongoose.model(collection_name, export_schema)
    let test = true

    // Traitement des clefs de donnée exemple
    example_keys = example_datas[0]
    delete example_keys["_id"]
    delete example_keys['__v']
    example_keys = Object.keys(example_keys)

    // Vérification et traitement des clefs des données cibles
    params.content.forEach(element => {
      let i = 0;
      Object.keys(element).forEach(key => {
        if(example_keys[i] != key){
          test = false
        }
        i++
      })
    })

    if(test == true){
      // Dans Base de donnée
      console.log("push")
      params.content.forEach(element => { 
        let collection = element
        console.log(collection)
        let new_data = new data(collection)
        new_data.save()
        .catch(err => {
          return err
        })
      })
    }
    else{
      // Error
      return false
    }
  },

  update: async(data_id, collection_name, params, example_datas) =>{
    let data = mongoose.model(collection_name, export_schema)
    let test = true

    // Traitement des clefs de donnée exemple
    console.log(example_datas)
    example_keys = example_datas
    delete example_keys["_id"]
    delete example_keys['__v']
    example_keys = Object.keys(example_keys)
    console.log("example_keys",example_keys)

    // Traitement des clefs de donnée cible
    target_keys = Object.keys(params)
    console.log("t_keys",target_keys)
    
    for (let index = 0; index < target_keys.length; index++) {
      const element = target_keys[index]
      if(example_keys[index] != element){
        test = false
      }
    }
    console.log(test)
    // Vérification
    if(test == true){
      // Dans Base de donnée
      console.log("push")
      const up_data = await data.findOne({"_id": data_id});
      console.log(up_data)

      // await upUser.save()
      // .catch(err => {
      //   return err
      // })
    }
    else{
      // Error
      return false
    }
  },

  updfdfate: async(billId, params) => {
    const upBill = await bill.findOne({rowid: billId});
    upBill.client = params.pseudo;
    upBill.create_date = params.create_date;
    upBill.status = params.status;
    upBill.payment_date = params.payment_date;
    upBill.price = params.price;
    upBill.products = params.products;
    await upUser.save();
  }
  
} 