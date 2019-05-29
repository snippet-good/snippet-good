const router = require('express').Router()
const {
  models: { CohortStretch }
} = require('../db/index')

// GET, retrieves all cohort stretches from the database
router.get('/', (req, res, next) => {
  CohortStretch.findAll()
    .then(cohortStretches => res.json(cohortStretches))
    .catch(next)
})

module.exports = router
