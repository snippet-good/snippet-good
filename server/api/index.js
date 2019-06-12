const express = require('express')
const router = express.Router()

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
router.use('/stretch-answers', require('./stretch-answers'))
router.use('/comments', require('./comments'))
// StretchAnswer

// Misc. API
router.use('/code', require('./code-editor'))

module.exports = router
