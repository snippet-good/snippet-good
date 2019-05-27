const router = require('express').Router()
const {
  models: { Cohort }
} = require('../db/index')

module.exports = router

// get all cohorts
router.get('/', (req, res, next) => {
  Cohort.findAll()
    .then(cohorts => res.send(cohorts))
    .catch(next)
})

// get single cohort
router.get('/:id', (req, res, next) => {
  Cohort.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(cohort => res.send(cohort))
    .catch(next)
})
