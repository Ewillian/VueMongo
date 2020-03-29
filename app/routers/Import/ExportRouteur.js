const router = require('express').Router()
const bodyparser = require('body-parser')
const model = require('../../models/Export/ExportModel.js')
const mongoose = require('mongoose')
require('../../index')

router.use(bodyparser.json())
router.use(bodyparser.urlencoded({
        extended: true
}))


router.get('/all/:collection_names', function(req, res, next) {
    model.getall(req.params.collection_names).then((result) => {
        console.log(result)
        let json_to_object = JSON.parse(JSON.stringify(result))
        res.format({
            json: () => {
                res.send({           
                    json_to_object
                })
            }
        })
    })
})

router.post('/insertData/:collectionName',(req, res, next) => {
    console.log("Poster des données")
    JSONfileContent = JSON.parse(JSON.stringify(req.body))
    model.getall(req.params.collectionName).then((result) => {
        console.log(result)
        let json_to_object = JSON.parse(JSON.stringify(result))

        model.insertOne(req.params.collectionName, JSONfileContent, json_to_object).then((result) => {
            if(result == false){
                // à modifier le code status
                res.format({
                    json: () => {res.status(500).send({ code: 'Données entrées non valide.'})}
                  })
            }
            else{
                res.format({
                    json: () => {res.status(201).send({ code: 'ok' })}
                  })
            }
        }).catch((e) =>{
            res.format({
                json: () => {res.status(500).send({ code: 'Internal Server Error'})}
              })
        }) 
    }).catch((e) =>{
        res.format({
            json: () => {res.status(500).send({ code: 'Internal Server Error'})}
          })
    })
})

router.post('/insertManyData/:collectionName',(req, res, next) => {
    console.log("Poster des données")
    JSONfileContent = JSON.parse(JSON.stringify(req.body))
    model.getall(req.params.collectionName).then((result) => {
        console.log(result)
        let json_to_object = JSON.parse(JSON.stringify(result))

        model.insertMany(req.params.collectionName, JSONfileContent, json_to_object).then((result) => {
            if(result == false){
                // à modifier le code status
                res.format({
                    json: () => {res.status(500).send({ code: 'Données entrées non valide.'})}
                  })
            }
            else{
                res.format({
                    json: () => {res.status(201).send({ code: 'ok' })}
                  })
            }
        }).catch((e) =>{
            res.format({
                json: () => {res.status(500).send({ code: 'Internal Server Error'})}
              })
        }) 
    }).catch((e) =>{
        res.format({
            json: () => {res.status(500).send({ code: 'Internal Server Error'})}
          })
    })
})

    //console.log(req.body)
    // data.insert(req.body).then(() => {
    //     res.format({
    //       //html: () => { res.redirect(`/games/`) },
    //       json: () => { res.status(201).send({ code: 'ok' }) }
    //     })
    // }) 
    
    module.exports = router