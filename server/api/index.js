const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/stretches', require('./stretches'))

module.exports = router
