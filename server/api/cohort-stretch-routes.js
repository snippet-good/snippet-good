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

// get cohort stretches by status ('open', 'closed', 'scheduled')
router.get('/:status', (req, res, next) => {
  CohortStretch.getStretches(req.params.status)
    .then(stretchesByStatus => res.send(stretchesByStatus))
    .catch(next)
})
