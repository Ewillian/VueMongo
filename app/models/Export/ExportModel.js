const mongoose = require('mongoose')
var Schema = mongoose.Schema
const export_schema = new Schema({ any: Schema.Types.Mixed}, {strict: false})
mongoose.pluralize(null)

module.exports = {

  get: async(data_id, collection_name) => {
    //Création Schéma
    let data = mongoose.model(collection_name, export_schema);
    //Récupération Données
    var result = data.findOne({"_id": data_id})
    //Suppression Schéma
    delete mongoose.connection.models[collection_name]
    //Envois des données
    return await result;
  },

  getall: async(collection_name) => {
    //Création Schéma
    let data = mongoose.model(collection_name, export_schema);
    //Récupération Données
    var result = data.find({})
    //Suppression Schéma
    delete mongoose.connection.models[collection_name]
    //Envois des données
    return await result
  },

  insertOne: async(collection_name, params, example_datas) =>{
    //Création Schéma
    let data = mongoose.model(collection_name, export_schema)
    //Valeur de résultats de test
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

    // Vérification
    if(test == true){
      // Dans Base de donnée
      let collection = params
      let new_data = new data(collection)
      await new_data.save()
      delete mongoose.connection.models[collection_name]
    }
    else{
      // Error
      delete mongoose.connection.models[collection_name]
      return false
    }
  },

  insertMany: async(collection_name, params, example_datas) =>{
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
        let data = mongoose.model(collection_name, export_schema)
        let collection = element
        console.log(collection)
        let new_data = new data(collection)
        new_data.save()
        .catch(err => {
          delete mongoose.connection.models[collection_name]
          return err
        })
        delete mongoose.connection.models[collection_name]
      })
    }
    else{
      // Error
      return false
    }
  },

  createCollection: async(collection_name, params) =>{
    //Création du schéma
    let data = mongoose.model(collection_name, export_schema)
    //Remplissage du schéma
    const jsonContent = new data(
      params
    )
    //Enregistrement et création de la collection
    await jsonContent.save()
    //Suppression du schéma
    delete mongoose.connection.models[collection_name]
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

    // Traitement des clefs de donnée cible
    target_keys = Object.keys(JSON.parse(params))

    // Vérification
    for (let index = 0; index < target_keys.length; index++) {
      const element = target_keys[index]
      if(example_keys[index] != element){
        test = false
      }
    }

    if(test == true){
      // Dans Base de donnée
      console.log("push")
      const entries = example_keys
      const updates = {}
      for (let i = 0; i < entries.length; i++) {
        updates[entries[i]] = Object.values(JSON.parse(params))[i]
      }
      data.update({
        "_id": data_id} , {
          $set: updates
        } , 
        function (err , success) {
          if (err) throw (err);
      })
      delete mongoose.connection.models[collection_name]
    }
    else{
      // Error
      delete mongoose.connection.models[collection_name]
      return false
    }
  }
  
} 