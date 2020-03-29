const router = require('express').Router()
const bodyparser = require('body-parser')

const model = require('../../models/Export/ExportModel')

const mongoose = require('mongoose')
mongoose.pluralize(null)
const Schema = mongoose.Schema
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
    JSONfileContent = JSON.parse(fileContent)
    const schemaJson = new Schema({ any: Schema.Types.Mixed}, {strict: false})
    const jsonCollection = mongoose.model(req.params.collectionName, schemaJson)
    const jsonContent = new jsonCollection(
        JSONfileContent
    )
    jsonContent.save()
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
