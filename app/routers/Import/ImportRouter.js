const router = require('express').Router()
const bodyparser = require('body-parser')
const data = require('../../models/Import/ImportModel.js')
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017"
const mongoose = require('mongoose')

//Apply BodyParser
router.use(bodyparser.json())
router.use(bodyparser.urlencoded({
        extended: true
}))

router.get('/all/:collection_names', function(req, res, next) {
    data.getall(req.params.collection_names).then((result) => {
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

router.get('/collections', function(req, res, next) {
    MongoClient.connect(url, function(err, client) {
        var collections_names = []
        const db = client.db("DataBase")
        db.listCollections().toArray(function(err, items) {
           items.forEach(element => {
            collections_names.push(element)
            });
            res.format({
                json: () => {
                    res.send({           
                        collections_names
                    })
                }
            })
            client.close();
       })
      })
})

router.post('/fromcollection/:id', function(req, res, next) {
     var id = mongoose.Types.ObjectId(req.params.id);
     data.getone(id, req.body.collection_name).then((result) => {
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

router.post('/newdata/:collection_name',(req, res, next) => {
    data.insert(req.params.collection_name, req.body).then(() => {
        res.format({
          json: () => { res.status(201).send({ code: 'ok' }) }
        })
    }) 
})

router.delete('/:id', (req, res, next) => {
    data.remove(req.body.collection_name, req.params.id).then(() => {
      res.format({
        json: () => { res.status(200).send({ message: 'success' }) }
      })
    }).catch(next)
})

router.delete('/collection/:collection_name', (req, res, next) => {
    data.dropDatabase(req.params.collection_name).then(() => {
      res.format({
        json: () => { res.status(200).send({ message: 'success' }) }
      })
    }).catch(next)
})

module.exports = router