const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/cohorts', require('./cohorts'))
router.use('/stretches', require('./stretches'))

module.exports = router
