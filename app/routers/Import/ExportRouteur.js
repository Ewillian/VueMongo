const router = require('express').Router()
const bodyparser = require('body-parser')

const model = require('../../models/Export/ExportModel')

const mongoose = require('mongoose')
mongoose.pluralize(null)
const Schema = mongoose.Schema
require('../../index')

module.exports = router

router.get('/', function(req, res, next) {
    console.log('export')
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
    const schemaJson = new Schema({ any: Schema.Types.Mixed}, {strict: false})
    const jsonCollection = mongoose.model(req.params.collectionName, schemaJson)
    const jsonContent = new jsonCollection({
        "employees": 
        [
            {
                "firstName": "Anna",
                "lastName": "Meyers"
            },
            {
                "firstName": "Betty",
                "lastName": "Layers"
            },
            {
                "firstName": "Carl",
                "lastName": "Louis"
            },
            {
                "firstName": "Bruce",
                "lastName": "Wayne"
            }
        ]
   }
   )
    jsonContent.save()
})
    //console.log(req.body)
    // data.insert(req.body).then(() => {
    //     res.format({
    //       //html: () => { res.redirect(`/games/`) },
    //       json: () => { res.status(201).send({ code: 'ok' }) }
    //     })
    // }) 
