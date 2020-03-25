const router = require('express').Router()
const bodyparser = require('body-parser')
const data = require('../../models/Import/ImportModel.js')
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = "mongodb://localhost:27017"

router.get('/', function(req, res, next) {
    console.log('getall')
    data.getall().then((result) => {
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

router.get('/collections', function(req, res, next) {
    console.log('getcollections')
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

router.get('/:id', function(req, res, next) {
    console.log('getone')
    var id = mongoose.Types.ObjectId(req.params.id);
    data.getone(id).then((result) => {
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

router.post('/',(req, res, next) => {
    console.log("POST a new data")
    console.log(req.body)
    data.insert(req.body).then(() => {
        res.format({
          json: () => { res.status(201).send({ code: 'ok' }) }
        })
    }) 
})

router.delete('/:data_id', (req, res, next) => {
    data.remove(req.params.data_id).then(() => {
      res.format({
        json: () => { res.status(200).send({ message: 'success' }) }
      })
    }).catch(next)
})


module.exports = router