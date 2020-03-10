const router = require('express').Router()
const bodyparser = require('body-parser')

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

module.exports = router