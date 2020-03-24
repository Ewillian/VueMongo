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