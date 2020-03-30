const router = require('express').Router()
const bodyparser = require('body-parser')
const model = require('../../models/Export/ExportModel.js')
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;

router.use(bodyparser.json())
router.use(bodyparser.urlencoded({
        extended: true
}))

//GET all in collection_names
router.get('/all/:collection_names', function(req, res, next) {
    //Appel du modèle mongoose (ExportModel)
    model.getall(req.params.collection_names).then((result) => {
        //Resultats to JSON
        let json_to_object = JSON.parse(JSON.stringify(result))
        //Envois des données
        res.format({
            json: () => {
                res.send({           
                    json_to_object
                })
            }
        })
    //Si erreur
    }).catch((err) => {
        console.log(err)
        res.format({
            json: () => {res.status(500).send({ code: 'Internal Server Error'})}
          })
    })
})

//POST ONE data to collection
router.post('/insertData/:collectionName',(req, res, next) => {
    //req.body to JSON
    JSONfileContent = JSON.parse(req.body.fileContent)
    //Appel du modèle mongoose (ExportModel)
    model.getall(req.params.collectionName).then((result) => {
        let json_to_object = JSON.parse(JSON.stringify(result))

        model.insertOne(req.params.collectionName, JSONfileContent, json_to_object).then((result) => {
            //Si données non valide
            if(result == false){
                res.format({
                    json: () => {res.send({ code: '400'})}
                  })
            }
            //Si données correcte
            else{
                res.format({
                    json: () => {res.status(201).send({ code: 'ok' })}
                  })
            }
        //Si erreur
        }).catch((err) =>{
            console.log(err)
            res.format({
                json: () => {res.send({ code: '500'})}
              })
        }) 
    //Si erreur
    }).catch((err) =>{
        console.log(err)
        res.format({
            json: () => {res.send({ code: '500'})}
        })
    })
})

//POST MULTIPLE data to collection
router.post('/insertManyData/:collectionName',(req, res, next) => {
    //req.body to JSON
    JSONfileContent = JSON.parse(req.body.fileContent)
    //Appel du modèle mongoose (ExportModel)
    model.getall(req.params.collectionName).then((result) => {
        //result to JSON
        let json_to_object = JSON.parse(JSON.stringify(result))
        //Appel du modèle mongoose (ExportModel)
        model.insertMany(req.params.collectionName, JSONfileContent, json_to_object).then((result) => {
            //Si données non valide
            if(result == false){
                res.format({
                    json: () => {res.send({ code: '400'})}
                  })
            }
            //Si données valide
            else{
                res.format({
                    json: () => {res.status(201).send({ code: 'ok' })}
                  })
            }
        //Si erreur
        }).catch((err) =>{
            console.log(err)
            res.format({
                json: () => {res.send({ code: '500'})}
              })
        }) 
    //Si erreur
    }).catch((err) =>{
        console.log(err)
        res.format({
            json: () => {res.send({ code: '500'})}
          })
    })
})

router.post('/createCollection/:collectionName',(req, res, next) => {
    //To JSON fileContent
    fileContent = req.body.fileContent
    fileContent = JSON.parse(fileContent)
    let exist = false

    MongoClient.connect("mongodb://localhost:27017", function(err, client) {
        var collections_names = []
        const db = client.db("DataBase")
        db.listCollections().toArray(function(err, items) {
           items.forEach(element => {
            collections_names.push(element)
            })
            console.log("collections_names", collections_names)
            collections_names.forEach(element => {
                if(element.name == req.params.collectionName){
                    console.log("element", element)
                    exist = true
                }
            })
            if(exist == false){
                //Appel du modèle mongoose (ExportModel)
                model.createCollection(req.params.collectionName, fileContent).then((result) => {
                    res.format({
                        json: () => {res.status(201).send({ code: 'ok' })}
                    })
                //Si erreur
                }).catch((err) => {
                    console.log(err)
                    res.format({
                        json: () => {res.send({ code: '500' })}
                    })
                })
            }else {
                res.format({
                    json: () => {res.send({ code: '409' })}
                })
            }
            client.close();
       })
    })
})

router.put('/data/:data_id', function(req, res, next) {
    //Parse req.body elements
    let collection_name = req.body.collection_name
    let params = req.body.content
    console.log(req.body.collection_name, req.body.content, req.params.data_id)
    //To JSON params
    params = JSON.stringify(params)
    //Appel du modèle mongoose (ExportModel)
     model.get(req.params.data_id, collection_name).then((result) => {
         //To JSON json_to_object (result)
         let json_to_object = JSON.parse(JSON.stringify(result))
         //Appel du modèle mongoose (ExportModel)
         model.update(req.params.data_id, collection_name, params, json_to_object).then((result) => {
             res.format({
                 json: () => {res.status(201).send({ code: 'ok' })}
             })
         //Si erreur
         }).catch((err) => {
             console.log(err)
             res.format({
                 json: () => {res.send({ code: '500' })}
             })
         })
     })
})

module.exports = router