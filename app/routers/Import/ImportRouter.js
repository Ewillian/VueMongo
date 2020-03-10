const router = require('express').Router()
const bodyparser = require('body-parser')
const data = require('../../models/Import/ImportModel.js')
var mongoose = require('mongoose');

//Récupérer un user en fonction de son id
router.get('/:id', function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.params.id);
    data.get(id).then((result) => {
        res.format({
            json: () => {
                res.send({
                    
                    data: result,
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