const router = require('express').Router()
const bodyparser = require('body-parser')
const data = require('../../models/Import/ImportModel.js')
const mongoose = require('mongoose')

router.get('/', function(req, res, next) {
    console.log('test')
    res.format({
        json: () => {
            res.send({                  
                data: "result"
            })
        }/*,
             html: () => {
                 res.render()
             }*/
    })
})

router.get('/:id', function(req, res, next) {
    console.log('test')
    var id = mongoose.Types.ObjectId(req.params.id);
    
    data.get(id).then((result) => {
        console.log(result)
        var json_to_object = JSON.parse(JSON.stringify(result))
        // JSON.parse(result).forEach(element => {
        //     console.log(element)
        // });
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

module.exports = router