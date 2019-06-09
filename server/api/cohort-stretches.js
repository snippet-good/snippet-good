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

// POST, creates a new relationship between stretch, cohort, and admin(s)
router.post('/', (req, res, next) => {
  CohortStretch.create(req.body)
    .then(newCohortStretch => newCohortStretch.addAssociations())
    .then(newCohortStretch => res.json(newCohortStretch))
    .catch(next)
})

// PUT, updates existing relationship between stretch, cohort, and admin(s)
router.put('/:id', (req, res, next) => {
  CohortStretch.findByPk(req.params.id)
    .then(cohortStretch => cohortStretch.update(req.body))
    .then(cohortStretch => cohortStretch.addAssociations())
    .then(cohortStretch => res.json(cohortStretch))
    .catch(next)
})

module.exports = router
