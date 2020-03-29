const router = require('express').Router()
const bodyparser = require('body-parser')
const model = require('../../models/Export/ExportModel')
const mongoose = require('mongoose')
require('../../index')

module.exports = router

router.get('/', function(req, res, next) {
    console.log('upload')
    res.format({
        // json: () => {
        //     res.send({                  
        //         test: "export"
        //     })
        // },
        html: () => {
            res.render()
        }
    })
})

router.post('/:collectionName',(req, res, next) => {
    console.log("Poster des données")
    fileContent = req.body.fileContent
    model.insert(req.params.collectionName, fileContent).then(() => {
        res.format({
          json: () => { res.status(201).send({ code: 'ok' }) }
        })
    }).catch(() =>{
        res.format({
            json: () => { res.status(500).send({ code: 'Internal Server Error' }) }
          })
    }) 
})

router.post('/insertData/:collectionName', (req, res, next) => {
    console.log('ajouter des données')
    fileContent = req.body.fileContent
    console.log('Nom collection : ' + req.params.collectionName)
    console.log('Contenu fichier : ' + fileContent)
    mongoose.connection.collection(req.params.collectionName).insertOne(JSON.parse(fileContent))
})
    //console.log(req.body)
    // data.insert(req.body).then(() => {
    //     res.format({
    //       //html: () => { res.redirect(`/games/`) },
    //       json: () => { res.status(201).send({ code: 'ok' }) }
    //     })
    // }) 
