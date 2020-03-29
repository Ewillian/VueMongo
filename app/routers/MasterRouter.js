// Import addons
const router = require('express').Router()

// Import routers
const import_router = require('./Import/ImportRouter.js')
const export_router = require('./Import/ExportRouteur.js')

// URL to routers
router.use('/import', import_router)
router.use('/upload', export_router)
router.use('/upload/:id', export_router)


// Export
module.exports = router