const router = require('express').Router()
const bodyparser = require('body-parser')
const data = require('../../models/Import/ImportModel.js')

router.get('/', function(req, res, next) {
    console.log("Simple GET")
    res.format({
        json: () => {
            res.send({
                data: "ok",
            })
        }/*,
             html: () => {
                 res.render()
             }*/
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