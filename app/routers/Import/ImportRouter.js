const router = require('express').Router()
const bodyparser = require('body-parser')
const data = require('../../models/Import/ImportModel.js')
const mongoose = require('mongoose')

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
            }/*,
                 html: () => {
                     res.render()
                 }*/
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
            }/*,
                 html: () => {
                     res.render()
                 }*/
        })
    })
})

router.post('/',(req, res, next) => {
    console.log("POST a new data")
    console.log(req.body)
    data.insert(req.body).then(() => {
        res.format({
          //html: () => { res.redirect(`/games/`) },
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