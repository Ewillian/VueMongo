const router = require('express').Router()
const bodyparser = require('body-parser')

const model = require('../../models/Export/ExportModel')

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

router.get('/sendData', function(req, res, nex) {
    console.log('sendData')
    res.format({
        html: res.render()
    })
})

router.post('/',(req, res, next) => {
    console.log("Poster des données")
    //console.log(req.body)
    // data.insert(req.body).then(() => {
    //     res.format({
    //       //html: () => { res.redirect(`/games/`) },
    //       json: () => { res.status(201).send({ code: 'ok' }) }
    //     })
    // }) 
})