const router = require('express').Router()
const {
  models: { CohortStretch }
} = require('../db/index')

// GET, retrieves all cohort stretches from the database
router.get('/', (req, res, next) => {
  CohortStretch.getAllCohortStretches()
    .then(cohortStretches => res.json(cohortStretches))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  CohortStretch.findByPk(req.params.id)
    .then(cohortstretch => cohortstretch.update(req.body))
    .then(cohortstretch => res.json(cohortstretch))
    .catch(next)
})

module.exports = router
