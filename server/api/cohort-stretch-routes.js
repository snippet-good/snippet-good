const router = require('express').Router()
const {
  models: { CohortStretch, Stretch }
} = require('../db/index')

module.exports = router

// get all cohort stretches, excluding status
router.get('/', (req, res, next) => {
  CohortStretch.findAll()
    .then(cohortStretch => res.send(cohortStretch))
    .catch(next)
})

// get cohort stretches by cohort-id
router.get('/:cohortId', (req, res, next) => {
  Stretch.getStretchesByCohort(req.params.cohortId)
    .then(stretches => res.send(stretches))
    .catch(next)
})

// get cohort stretches by cohort and status ('open', 'closed', 'scheduled')
router.get('/:cohortId/:status', (req, res, next) => {
  Stretch.getStretchesByCohortAndStatus(req.params.cohortId, req.params.status)
    .then(stretches => res.send(stretches))
    .catch(next)
})
