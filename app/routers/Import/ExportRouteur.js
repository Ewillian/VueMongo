const router = require('express').Router()
const bodyparser = require('body-parser')
const model = require('../../models/Export/ExportModel.js')
const mongoose = require('mongoose')

router.use(bodyparser.json())
router.use(bodyparser.urlencoded({
        extended: true
}))


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

router.post('/insertData/:collectionName',(req, res, next) => {
    //req.body to JSON
    JSONfileContent = JSON.parse(JSON.stringify(req.body))
    //Appel du modèle mongoose (ExportModel)
    model.getall(req.params.collectionName).then((result) => {
        let json_to_object = JSON.parse(JSON.stringify(result))

        model.insertOne(req.params.collectionName, JSONfileContent, json_to_object).then((result) => {
            //Si données non valide
            if(result == false){
                res.format({
                    json: () => {res.status(400).send({ code: 'Données entrées non valide.'})}
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
                json: () => {res.status(500).send({ code: 'Internal Server Error'})}
              })
        }) 
    //Si erreur
    }).catch((err) =>{
        console.log(err)
        res.format({
            json: () => {res.status(500).send({ code: 'Internal Server Error'})}
        })
    })
})

router.post('/insertManyData/:collectionName',(req, res, next) => {
    //req.body to JSON
    JSONfileContent = JSON.parse(JSON.stringify(req.body))
    //Appel du modèle mongoose (ExportModel)
    model.getall(req.params.collectionName).then((result) => {
        //result to JSON
        let json_to_object = JSON.parse(JSON.stringify(result))
        //Appel du modèle mongoose (ExportModel)
        model.insertMany(req.params.collectionName, JSONfileContent, json_to_object).then((result) => {
            //Si données non valide
            if(result == false){
                res.format({
                    json: () => {res.status(400).send({ code: 'Données entrées non valide.'})}
                  })
            }
            //Si données valide
            else{
                res.format({
                    json: () => {res.status(201).send({ code: 'ok' })}
                  })
            }
        //Si erreur
        }).catch((e) =>{
            res.format({
                json: () => {res.status(500).send({ code: 'Internal Server Error'})}
              })
        }) 
    //Si erreur
    }).catch((e) =>{
        res.format({
            json: () => {res.status(500).send({ code: 'Internal Server Error'})}
          })
    })
})

const Schema = mongoose.Schema
router.post('/createCollection/:collectionName',(req, res, next) => {
    console.log("Poster des données")
    fileContent = req.body.fileContent
    fileContent = JSON.parse(fileContent)
    model.createCollection(req.params.collectionName, fileContent).then((result) => {
        console.log(result)
        res.format({
            json: () => {res.status(201).send({ code: 'ok' })}
        })
    }).catch((err) => {
        console.log(err)
        res.format({
            json: () => {res.status(500).send({ code: 'Internal Server Error' })}
        })
    })
})

router.put('/data/:data_id', function(req, res, next) {
    let collection_name = req.body.collection_name
    let params = req.body.content[0]
    params = JSON.stringify(params)
    model.get(req.params.data_id, collection_name).then((result) => {
        let json_to_object = JSON.parse(JSON.stringify(result))
        model.update(req.params.data_id, collection_name, params, json_to_object).then((result) => {
            res.format({
                json: () => {res.status(201).send({ code: 'ok' })}
            })
        })
    })
})

module.exports = router