// Import addons
const router = require('express').Router()

// Import routers
const import_router = require('./Import/ImportRouter')

// URL to routers
router.use('/import', import_router)

// Export
module.exports = router;