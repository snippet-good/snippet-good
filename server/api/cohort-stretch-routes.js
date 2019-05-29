const router = require('express').Router()
const {
  models: { CohortStretch }
} = require('../db/index')

module.exports = router

// get all cohort stretches, excluding status
router.get('/', (req, res, next) => {
  CohortStretch.findAll()
    .then(cohortStretch => res.send(cohortStretch))
    .catch(next)
})
