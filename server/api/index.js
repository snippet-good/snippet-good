const router = require('express').Router()

// Authentication API
router.use('/auth', require('./auth'))

// User-related API
router.use('/users', require('./users'))
router.use('/cohorts', require('./cohorts'))
router.use('/cohort-users', require('./cohort-users'))

// Stretch-related API
router.use('/categories', require('./categories'))
router.use('/stretches', require('./stretches'))
router.use('/cohort-stretches', require('./cohort-stretches'))
// StretchAnswer

// Misc. API
router.use('/code', require('./code-editor'))

module.exports = router
